import hashlib
import random


def random_hash(length=10):
    value = str(random.random())
    hash = hashlib.sha1(value.encode('utf-8')).hexdigest()
    return hash[:length]