from queue import PriorityQueue

from dataclasses import dataclass
import uuid
import datetime


class CustomPriorityQueue(PriorityQueue):
    def _put(self, item):
        return super()._put((self._get_priority(item), item))

    def _get(self):
        return super()._get()[1]


    def _get_priority(self, item):
        # Make this negative because the queue is a lowest value priority
        return -item.energy  # this is something known so it works for our situation


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
    demand: float
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
