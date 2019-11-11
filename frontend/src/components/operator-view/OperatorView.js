import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthConsumer } from "../auth/authContext";
import { Redirect } from "react-router-dom";
import { SECONDS_PER_MARKET_PERIOD } from '../../../src/system_config';
import OperatorName from './OperatorName';
import MarketPeriodControl from './MarketPeriodControl';
import OperatorInfo from './OperatorInfo';
import StatsPerMarketPeriod from './StatsPerMarketPeriod';
import TransactionsTableComponentScrollable from './TransactionsTableComponentScrollable';
import DailyEnergyGraph from './DailyEnergyGraph';
import DailyQueueGraph from './DailyQueueGraph';
import MapOfAllUsers from './MapOfAllUsers';
import ListOfAllUsersScrollable from './ListOfAllUsersScrollable';
import ListOfAllAssetsScrollable from './ListOfAllAssetsScrollable';
import AllTransactionsFilter from './AllTransactionsFilter';
import Loading from '../base-view/Loading';
import Can from "../auth/Can";
import TransactionsService from './TransactionsService';


const transactionsService = new TransactionsService();


class OperatorView extends Component {
    
    _isMounted = false;

    constructor(props) {
        super(props);       
        this.refresh = this.refresh.bind(this);
        this.state = {
            demand_info: [],
            supply_info: [],
            queue_info: [],
            stats: [],
            local_transactions: [],
            grid_transactions: [],
            users: [],
            assets: [],
            all_transactions: [],
            newData: false,
            energy_queue: [],
            accessToken: null
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.accessToken !== prevProps.accessToken) {
            this.refresh();
            if (this._isMounted){
                this.setState({
                    accessToken: this.props.accessToken
                });
            }
        }
    }

    // try componentwillmount (instead of did)
    /*componentWillMount() {
        //this._isMounted = true;
        this.refresh();
        this.timer = setInterval(() => this.refresh(), SECONDS_PER_MARKET_PERIOD * 500);
    }*/

    componentWillUnmount() {
        this.timer = null;
        this._isMounted = false;
    }

    componentDidMount(){
        this._isMounted = true;
        if (this.props.accessToken && this._isMounted) {
            this.refresh();
        }
        this.timer = setInterval(() => this.refresh(), SECONDS_PER_MARKET_PERIOD * 1000);
    }

    refresh() {
        var self = this;
        if (self.props.accessToken) {
            transactionsService.getEnergyDemandForPriorDay(self.props.accessToken).then((demand_res) => {
                transactionsService.getEnergySupplyForPriorDay(self.props.accessToken).then((supply_res) => {
                    transactionsService.getAllMostRecentTransactions(0, self.props.accessToken).then((local_trans_res) => {
                        transactionsService.getAllMostRecentTransactions(1, self.props.accessToken).then((grid_trans_res) => {
                            transactionsService.getMarketPeriodStats(self.props.accessToken).then((stats_res) => {
                                transactionsService.getDailyEnergyQueue(self.props.accessToken).then((queue_res) => {    
                                    if (self._isMounted) {
                                        self.setState({ 
                                            demand_info: demand_res,
                                            supply_info: supply_res,
                                            local_transactions: local_trans_res.data,
                                            grid_transactions: grid_trans_res.data,
                                            stats: stats_res,
                                            newData: stats_res !== self.state.stats ? true : false,
                                            energy_queue: queue_res
                                        })
                                    }
                                })
                            })
                        })
                    })
                })
            });
        }
    }

  
    render() {
        return (
            <AuthConsumer>
                {({ accessToken, loading, loginRequired, user }) => (
                    <div className="container">
                        {loginRequired ? (<Redirect to="/" />) : (<div></div>)}
                        {loading ? (
                            <div>
                                <Loading type="spinner-homeowner"></Loading>
                            </div>
                        ) : (
                                <div>
                                    <Can
                                        role={user.role}
                                        perform="homeowner-pages:visit"
                                        yes={() => (
                                            <Redirect to="/homeowner/" />
                                        )}
                                    />
                                    <Container className="container">
                                        <Row>
                                            <Col className="operator-name-wrapper" lg="7">
                                                <OperatorName
                                                    user={user}
                                                    token={accessToken}>
                                                </OperatorName>
                                            </Col>
                                            <Col className="special-top-wrapper">
                                                <MarketPeriodControl token={accessToken}></MarketPeriodControl>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="wrapper" sm="6">
                                                <TransactionsTableComponentScrollable
                                                    token={accessToken}
                                                    title={"Latest Local Transactions"}
                                                    transactions={this.state.local_transactions}
                                                    is_with_grid={0}
                                                    newData={this.state.newData}>
                                                </TransactionsTableComponentScrollable>
                                            </Col>
                                            <Col className="wrapper">
                                                <TransactionsTableComponentScrollable
                                                    token={accessToken}
                                                    title={"Latest Grid Transactions"}
                                                    transactions={this.state.grid_transactions}
                                                    is_with_grid={1}
                                                    newData={this.state.newData}>
                                                </TransactionsTableComponentScrollable>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="wrapper">
                                                <StatsPerMarketPeriod
                                                token={accessToken}
                                                stats={this.state.stats}>
                                                </StatsPerMarketPeriod>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="wrapper" lg="7">
                                                <MapOfAllUsers token={accessToken}></MapOfAllUsers>
                                            </Col>
                                            <Col className="wrapper">
                                                <OperatorInfo 
                                                token={accessToken}
                                                //transactions={this.state.all_transactions}
                                                //users={this.state.users}
                                                //assets={this.state.assets}
                                                ></OperatorInfo>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="wrapper">
                                                <AllTransactionsFilter token={accessToken}></AllTransactionsFilter>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                {/* hacky way to get the graphs centered but not fullscreen */}
                                            </Col>
                                            <Col className="wrapper" lg="8">
                                                <DailyEnergyGraph 
                                                    token={accessToken}
                                                    demand={this.state.demand_info}
                                                    supply={this.state.supply_info}>
                                                </DailyEnergyGraph>
                                                <DailyQueueGraph 
                                                    token={accessToken}
                                                    queue={this.state.energy_queue}>
                                                </DailyQueueGraph>
                                            </Col>
                                            <Col>
                                                {/* hacky way to get the graphs centered but not fullscreen */}
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="wrapper">
                                                <ListOfAllUsersScrollable token={accessToken}></ListOfAllUsersScrollable>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="bottom wrapper">
                                                <ListOfAllAssetsScrollable token={accessToken}></ListOfAllAssetsScrollable>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            )}
                    </div>
                )}
            </AuthConsumer>
        );
    }
}
export default OperatorView;
