def spiralMatrix(n):
    matrix = [[0 for i in range(n)] for j in range(n)]

    left =0
    right = n-1
    top = 0
    bottom = n-1
    num = 1

    while left <= right and top <= bottom:
        for j in range(left, right + 1):
            matrix[top][j] = num
            num +=1

        for i in range(top +1, bottom):
            matrix[i][right] = num
            num +=1

        for j in reversed(range(left, right + 1)):
            if top < bottom:
                matrix[bottom][j] = num
                num += 1

        for i in reversed(range(top + 1, bottom)):
            if left < right:
                matrix[i][left] = num
                num += 1
        
        left = left + 1
        right = right - 1
        top = top + 1
        bottom = bottom - 1

    return matrix

print(spiralMatrix(1))