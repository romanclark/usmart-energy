
from dataclasses import dataclass
import uuid
import datetime


@dataclass
class ProducerStruct:
    asset_id: uuid.uuid4
    energy: float
    flexible: bool

    def __eq__(self, other):
        if self.flexible == other.flexible:
            return True
        else:
            return False

    def __le__(self, other):
        if self.flexible and not other.flexible:
            return True
        elif not self.flexible and other.flexible:
            return False
        else:
            if self.energy <= other.energy:
                return True
            else:
                return False

    def __lt__(self, other):
        if self.flexible and not other.flexible:
            return True
        elif not self.flexible and other.flexible:
            return False
        else:
            if self.energy < other.energy:
                return True
            else:
                return False

    def __gt__(self, other):
        if self.flexible and not other.flexible:
            return False
        elif not self.flexible and other.flexible:
            return True
        else:
            if self.energy > other.energy:
                return True
            else:
                return False

    def __ge__(self, other):
        if self.flexible and not other.flexible:
            return False
        elif not self.flexible and other.flexible:
            return True
        else:
            if self.energy > other.energy:
                return True
            else:
                return False


@dataclass
class ConsumerStruct:
    asset_id: uuid.uuid4
    market_period_demand: float
    energy: float
    market_deadline: datetime

    def __eq__(self, other):
        if self.market_deadline == other.market_deadline:
            return True
        else:
            return False

    def __le__(self, other):
        if self.market_deadline <= other.market_deadline:
            return True
        else:
            return False

    def __lt__(self, other):
        if self.market_deadline < other.market_deadline:
            return True
        else:
            return False

    def __gt__(self, other):
        if self.market_deadline > other.market_deadline:
            return True
        else:
            return False

    def __ge__(self, other):
        if self.market_deadline >= other.market_deadline:
            return True
        else:
            return False

    def __str__(self):
        return "Demand: " + str(self.market_period_demand) + " deadline: " + str(self.market_deadline)
