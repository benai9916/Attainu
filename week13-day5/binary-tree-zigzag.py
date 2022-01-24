class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def zigzag_level_order(self, root):
        if root is None:
            return []
        result, current, level = [], [root], 1

        while current:
            next_level, vals = [], []
            for node in current:
                vals.append(node.val)
                if node.left:
                    next_level.append(node.left)
                if node.right:
                    next_level.append(node.right)

            if level % 2:
                result.append(vals)
            else:
                result.append(vals[::-1])

            level += 1
            current = next_level
        return result


root = TreeNode(1)
# root.left = TreeNode(9)
# root.right = TreeNode(20)
# root.right.left = TreeNode(15)
# root.right.right = TreeNode(7)

print(Solution().zigzag_level_order(root))