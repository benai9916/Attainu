class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

    def __repr__(self) -> str:
        if self:
            serial = []
            queue = [self]

            while queue:
                cur = queue[0]

                if cur:
                    serial.append(cur.val)
                    queue.append(cur.left)
                    queue.append(cur.right)
                else:
                    serial.append("null")

                queue = queue[1:]

            while serial[-1] == 'null':
                serial.pop()

            return repr(serial)

        else:
            return None


class Solution:
    def genTree(self, n):
        return self.genTreeRec(1, n)

    def genTreeRec(self, low, high):
        result = []

        if low > high:
            result.append(None)

        for i in range(low, high +1):
            left = self.genTreeRec(low, i - 1)
            right = self.genTreeRec(i + 1, high)

            for j in left:
                for k in right:
                    cur = TreeNode(i)
                    cur.left = j
                    cur.right = k
                    result.append(cur)

        return result


print(Solution().genTree(1))