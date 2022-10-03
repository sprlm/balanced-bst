const nodeFactory = (data) => {
  let left = null;
  let right = null;
  return { data, left, right }
};

const treeFactory = (arr) => {
  let root = buildTree(arr);
  
  function buildTree(arr) {
    let sortedArr = [...new Set(arr)].sort((a, b) => a - b);
    return sortedArrToBST(sortedArr, 0, sortedArr.length - 1);
  };

  function sortedArrToBST(arr, start, end) {
    if (start > end) {
      return null;
    }
    
    var mid = parseInt((start + end) / 2);
    var node = nodeFactory(arr[mid]);
    
    node.left = sortedArrToBST(arr, start, mid - 1);
    node.right = sortedArrToBST(arr, mid + 1, end);

    return node;
  };

  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  return { root, prettyPrint };
};

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let tree = treeFactory(arr);

tree.prettyPrint(tree.root);
