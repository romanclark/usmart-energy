from queue import PriorityQueue

from dataclasses import dataclass
import uuid


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

    def __eq__(self, other):
        if self.energy == other.energy:
            return True
        else:
            return False

    def __le__(self, other):
        if self.energy <= other.energy:
            return True
        else:
            return False

    def __lt__(self, other):
        if self.energy < other.energy:
            return True
        else:
            return False

    def __gt__(self, other):
        if self.energy > other.energy:
            return True
        else:
            return False

    def __ge__(self, other):
        if self.energy >= other.energy:
            return True
        else:
            return False


@dataclass
class ConsumerStruct:
    asset_id: uuid.uuid4
    demand: float
    energy: float

    def __eq__(self, other):
        if self.energy == other.energy:
            return True
        else:
            return False

    def __le__(self, other):
        if self.energy <= other.energy:
            return True
        else:
            return False

    def __lt__(self, other):
        if self.energy < other.energy:
            return True
        else:
            return False

    def __gt__(self, other):
        if self.energy > other.energy:
            return True
        else:
            return False

    def __ge__(self, other):
        if self.energy >= other.energy:
            return True
        else:
            return False