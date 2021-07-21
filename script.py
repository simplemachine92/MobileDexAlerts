from math import sqrt


def solution(area):

    area = 20
    # return list of the areas of the largest squares
    # that can be made out of the provided area, largest first
    if area < 1 or area > 1000000:
        raise ValueError("area should be between 1 and 1000000 inclusive")
    if sqrt(area).is_integer():
        return [area]
    biggest = int(sqrt(area)) ** 2
    return [biggest] + solution(area - biggest)


