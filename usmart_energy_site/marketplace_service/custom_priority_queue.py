from queue import PriorityQueue

class CustomPriorityQueue(PriorityQueue):
    def _put(self, item):
        return super()._put((self._get_priority(item), item))

    def _get(self):
        return super()._get()[1]


    def _get_priority(self, item):
        return item[1]
