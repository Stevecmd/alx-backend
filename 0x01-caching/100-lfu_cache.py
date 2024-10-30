#!/usr/bin/python3
""" LFUCache module
"""

from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """ LFUCache defines a LFU caching system """

    def __init__(self):
        """ Initialize the class """
        super().__init__()
        self.frequency = {}
        self.order = []

    def put(self, key, item):
        """ Add an item in the cache """
        if key is not None and item is not None:
            if key in self.cache_data:
                self.cache_data[key] = item
            else:
                if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                    min_freq = min(self.frequency.values())
                    lfu_keys = [
                        k for k, v in self.frequency.items()
                        if v == min_freq
                    ]
                    if len(lfu_keys) > 1:
                        lru_key = min(
                            lfu_keys,
                            key=lambda k: self.order.index(k)
                        )
                    else:
                        lru_key = lfu_keys[0]
                    del self.cache_data[lru_key]
                    del self.frequency[lru_key]
                    self.order.remove(lru_key)
                    print("DISCARD: {}".format(lru_key))
                self.cache_data[key] = item
                self.frequency[key] = 1
                self.order.append(key)

    def get(self, key):
        """ Get an item by key """
        if key is None or key not in self.cache_data:
            return None
        self.frequency[key] += 1
        self.order.remove(key)
        self.order.append(key)
        return self.cache_data.get(key)
