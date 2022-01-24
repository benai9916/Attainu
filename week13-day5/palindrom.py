def is_palindrom(num):
    if (num < 0 or (num % 10 == 0 and num  != 0)):
        return False

    revertedNo = 0
    while num > revertedNo:
        revertedNo = revertedNo * 10 + num % 10
        num /= 10

    return num == revertedNo or num == revertedNo / 10


print(is_palindrom(-121))