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
          if (current.right === null) {
            current.right = nodeFactory(value);
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
		if (node === null) {
			return null;
    } else if (key < node.data) {
			node.left = deleteNodeRec(node.left, key);
			return node;
		} else if ( key > node.data ) {
			node.right = deleteNodeRec(node.right, key);
			return node;
		} else {
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

  function levelOrder() {
    if (this.root === null) {
      return;
    } else {
      let queue = [this.root];
      let output = [];

      while (queue.length !== 0) {
        if (queue[0].left) {
          queue.push(queue[0].left);
        }

        if (queue[0].right) {
          queue.push(queue[0].right);
        }

        output.push(queue[0].data);
        queue.shift();
      }

      return output;
    }
  }

  function inOrder() {
    return inOrderRec(this.root, []);
  }

  function inOrderRec(node, output) {
    if (node !== null) {
      inOrderRec(node.left, output);
      output.push(node.data);
      inOrderRec(node.right, output);

      return output;
    }
  }

  function preOrder() {
    return preOrderRec(this.root, []);
  }

  function preOrderRec(node, output) {
    if (node !== null) {
      output.push(node.data);
      preOrderRec(node.left, output);
      preOrderRec(node.right, output);

      return output;
    }
  }

  function postOrder() {
    return postOrderRec(this.root, []);
  }

  function postOrderRec(node, output) {
    if (node !== null) {
      postOrderRec(node.left, output);
      postOrderRec(node.right, output);
      output.push(node.data);

      return output;
    }
  }

  function height(node) {
    if (this.root === null || node === null) {
      return null;
    } else {
      let current = this.root;
      let value = node.data;
      let depth = 0;

      while (current) {
        if (value < current.data) {
          current = current.left;
          depth++;
        } else if (value > current.data) {
          current = current.right;
          depth++;
        } else {
          return depth;
        }
      }

      return null;
    }
  }

  function depth(node) {
    if (node === null) {
      return 0;
    } else {
      let leftDepth = depth(node.left);
      let rightDepth = depth(node.right);
      return Math.max(leftDepth, rightDepth) + 1;
    }
  }

  function isBalanced() {
    return isBalancedRec(this.root) > -1;
  }

  function isBalancedRec(node) {
    if (node === null) {
      return 0;
    } else {
      let left = isBalancedRec(node.left);
      if (left === -1) { 
        return -1;
      }

      let right = isBalancedRec(node.right);
      if (right === -1) {
        return -1;
      }

      if (Math.abs(left - right) > 1) {
        return -1;
      } else {
        return Math.max(left, right) + 1;
      }
    }
  }

  function rebalance() {
    this.root = buildTree(this.inOrder());
  }

  return { 
    root, 
    prettyPrint, 
    insert, 
    deleteNode, 
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance
  };
};

let arr = Array(10).fill().map(() => Math.round(Math.random() * 101));
console.log(`Random Array: ${arr}`);

let tree = treeFactory(arr);
tree.prettyPrint(tree.root);

console.log(`Balanced: ${tree.isBalanced()}`);

console.log(`Preorder: ${tree.preOrder()}`);
console.log(`Inorder: ${tree.inOrder()}`);
console.log(`Postorder: ${tree.postOrder()}`);

for (let i = 0; i < 5; i++) {
  tree.insert(Math.round((Math.random() * 50) + 101));
}

tree.prettyPrint(tree.root);

console.log(`Balanced: ${tree.isBalanced()}`);

tree.rebalance();
tree.prettyPrint(tree.root);
console.log(`Balanced: ${tree.isBalanced()}`);

console.log(`Preorder: ${tree.preOrder()}`);
console.log(`Inorder: ${tree.inOrder()}`);
console.log(`Postorder: ${tree.postOrder()}`);
