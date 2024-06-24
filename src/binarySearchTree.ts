export class BSTNode {
    value: number;
    left?: BSTNode;
    right?: BSTNode;
  
    constructor(value: number) {
        this.value = value;
    }
}

export class BinarySearchTree {
    root?: BSTNode;
  
    constructor(value?: number) {
        this.root = new BSTNode(value);
    }
  
    insert(value: number): BSTNode | undefined {
        const newNode = new BSTNode(value);

        if (!this.root) {
            this.root = newNode;
            return this.root;
        } else {
            this.insertNode(this.root, newNode);
        }
    }
  
    insertNode(node: BSTNode, newNode: BSTNode) {
        if(newNode.value > node.value) {
            if(!node.right) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode); 
            }
        } else {
            if(!node.left) {
                node.left = newNode;
            } else {
                this.insertNode(node.left,newNode);
            }
        }
    }
    search(node: BSTNode | undefined, value: number): BSTNode | undefined {
        if (!node) {
            return undefined;
        }

        if (value > node.value) {
            return this.search(node.right, value);
        } else if (value < node.value) {
            return this.search(node.left, value);
        } else {
            return node;
        }
    }
}
