def solution(area):

    counter = 0
    square = 0
    storage = []
    
    if area >= 1 and area <= 1000000 and sqrt(area).is_integer():
        return [area]
    if area >=1 and area <= 1000000:
        while counter < area:
            square = int(sqrt(area)) ** 2
            storage.append(square)
            counter = counter + square
            return storage

