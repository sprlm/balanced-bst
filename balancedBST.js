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

  function insert(value) {
    if (this.root === null) {
      this.root = nodeFactory(value);
    } else {
      let current = this.root;

      while (current) {
        if (value < current.data) {
          if (current.left === null) {
            current.left = nodeFactory(value);
            return;
          } 
          current = current.left;
        } else if (value > current.data) {
          if (current.left === null) {
            current.left = nodeFactory(value);
            return;
          } 
          current = current.right;
        } else {
          return;
        }
      }
    }
  };

  function deleteNode(data) { 
    this.root = deleteNodeRec(this.root, data);
  }

	function deleteNodeRec(node, key) {
		if (node === null)
			return null;
		else if (key < node.data) {
			node.left = deleteNodeRec(node.left, key);
			return node;
		}
		else if ( key > node.data ) {
			node.right = deleteNodeRec(node.right, key);
			return node;
		}
		else {
			if (node.left === null && node.right === null) {
				node = null;
				return node;
			}
      
			if (node.left === null) {
				node = node.right;
				return node;
			} else if (node.right === null) {
				node = node.right;
				return node;
			}
      
			let aux = findMinNode(node.right);
			node.data = aux.data;
			node.right = deleteNodeRec(node.right, aux.data);
			return node;
		}
	}

  function find(value) {
    if (this.root === null) {
      return null;
    } else {
      let current = this.root;

      while (current) {
        if (value < current.data) {
          current = current.left;
        } else if (value > current.data) {
          current = current.right;
        } else {
          return current;
        }
      }

      return null;
    }
  };

  function findMinNode(node) {
		return (node.left === null) ? node : findMinNode(node.left);
	}

  return { root, prettyPrint, insert, deleteNode, find };
};

let arr = [1, 2, 3, 4, 5, 6, 7];

let tree = treeFactory(arr);

tree.prettyPrint(tree.find(6));
