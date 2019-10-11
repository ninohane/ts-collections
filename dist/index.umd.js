!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.tsCollections={})}(this,function(t){var e=function(t){this.comparator=null,this.comparator=t};e.prototype.clear=function(){this.root=null},e.prototype.contains=function(t){return this.containsRecursive(this.root,t)},e.prototype.containsRecursive=function(t,e){return null!=t&&(0===this.comparator(e,t.getData())||(this.comparator(e,t.getData())<0?this.containsRecursive(t.getLeft(),e):this.containsRecursive(t.getRight(),e)))},e.prototype.countTreeNodes=function(t){return null==t?0:1+this.countTreeNodes(t.getLeft())+this.countTreeNodes(t.getRight())},e.prototype.find=function(t){return null==this.root?null:this.findRecursive(this.root,t)},e.prototype.findRecursive=function(t,e){if(null==t)return null;if(e(t.getData()))return t.getData();var r=this.findRecursive(t.getLeft(),e);return null!=r?r:this.findRecursive(t.getRight(),e)},e.prototype.forEach=function(t){null!=this.root&&this.forEachRecursive(this.root,t)},e.prototype.forEachRecursive=function(t,e){null!=t&&(this.forEachRecursive(t.getLeft(),e),e(t.getData()),this.forEachRecursive(t.getRight(),e))},e.prototype.getRootData=function(){return this.root.getData()},e.prototype.isEmpty=function(){return null==this.root},e.prototype.remove=function(t){return!!this.contains(t)&&(this.delete(t),!0)},e.prototype.size=function(){return this.countTreeNodes(this.root)},e.prototype.toArray=function(){var t=[];return this.isEmpty()?t:(this.toArrayRecursive(this.root,t),t)},e.prototype.toArrayRecursive=function(t,e){null!=t&&(this.toArrayRecursive(t.getLeft(),e),e.push(t.getData()),this.toArrayRecursive(t.getRight(),e))},e.prototype.toInorderArray=function(t,e){null!=t&&(this.toInorderArray(t.getLeft(),e),e.push(t.getData()),this.toInorderArray(t.getRight(),e))},e.prototype.toPostorderArray=function(t,e){null!=t&&(this.toPostorderArray(t.getLeft(),e),this.toPostorderArray(t.getRight(),e),e.push(t.getData()))},e.prototype.toPreorderArray=function(t,e){null!=t&&(e.push(t.getData()),this.toPreorderArray(t.getLeft(),e),this.toPreorderArray(t.getRight(),e))},e.prototype.traverseAndMapToArray=function(t,e){void 0===e&&(e="INORDER");var r=[];switch(e){case"INORDER":this.toInorderArray(this.root,r);break;case"PREORDER":this.toPreorderArray(this.root,r);break;case"POSTORDER":this.toPostorderArray(this.root,r)}return r.map(function(e){return t(e)})},e.prototype.traverseAndMorph=function(t,e){return this.traverseAndMorphRecursive(this.root,e,t),t},e.prototype.traverseAndMorphRecursive=function(t,e,r){null!=t&&(r.insert(e(t.getData())),this.traverseAndMorphRecursive(t.getLeft(),e,r),this.traverseAndMorphRecursive(t.getRight(),e,r))};var r=function(t){this.data=t||null};r.prototype.getData=function(){return this.data},r.prototype.getLeft=function(){return this.left},r.prototype.getRight=function(){return this.right},r.prototype.setData=function(t){this.data=t},r.prototype.setLeft=function(t){this.left=t},r.prototype.setRight=function(t){this.right=t};var o=function(t){function e(r){t.call(this,r),this.setLeft(null),this.setRight(null),this.parent=null,this.color=e.RED}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.getColor=function(){return this.color},e.prototype.getParent=function(){return this.parent},e.prototype.getSibling=function(){return null==this.parent?null:this.isOnLeft()?this.parent.getRight():this.parent.getLeft()},e.prototype.getUncle=function(){return null==this.parent||null==this.parent.getParent()?null:this.parent.isOnLeft()?this.parent.getParent().getRight():this.parent.getParent().getLeft()},e.prototype.hasRedChild=function(){return null!=this.getLeft()&&this.getLeft().getColor()===e.RED||null!=this.getRight()&&this.getRight().getColor()===e.RED},e.prototype.isOnLeft=function(){return this.parent.getLeft()===this},e.prototype.moveDown=function(t){null!=this.parent&&(this.isOnLeft()?this.parent.setLeft(t):this.parent.setRight(t)),t.setParent(this.parent),this.parent=t},e.prototype.setColor=function(t){this.color=t},e.prototype.setParent=function(t){this.parent=t},e}(r);o.RED=0,o.BLACK=1;var i=function(t){function e(e){t.call(this,e),this.root=null}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.add=function(t){return!this.search(t)&&(this.insert(t),!0)},e.prototype.delete=function(t){if(this.contains(t)){var e=this.searchNode(t);this.deleteNode(e)}},e.prototype.deleteNode=function(t){var e=this.findReplaceItem(t),r=(null==e||e.getColor()===o.BLACK)&&t.getColor()===o.BLACK,i=t.getParent();null!==e?null!=t.getLeft()&&null!=t.getRight()?(this.swapValues(e,t),this.deleteNode(e)):t===this.root?(t.setData(e.getData()),t.setLeft(null),t.setRight(null)):(t.isOnLeft()?i.setLeft(e):i.setRight(e),e.setParent(i),r?this.fixDoubleBlack(e):e.setColor(o.BLACK)):t===this.root?this.root=null:(r?this.fixDoubleBlack(t):null!=t.getSibling()&&t.getSibling().setColor(o.RED),t.isOnLeft()?i.setLeft(null):i.setRight(null))},e.prototype.findReplaceItem=function(t){return null!=t.getLeft()&&null!=t.getRight()?this.getSuccessor(t.getRight()):null==t.getLeft()&&null==t.getRight()?null:null!=t.getLeft()?t.getLeft():t.getRight()},e.prototype.fixDoubleBlack=function(t){if(t!==this.root){var e=t.getSibling(),r=t.getParent();null==e?this.fixDoubleBlack(r):e.getColor()===o.RED?(r.setColor(o.RED),e.setColor(o.BLACK),e.isOnLeft()?this.rightRotate(r):this.leftRotate(r),this.fixDoubleBlack(t)):e.hasRedChild()?(null!=e.getLeft()&&e.getLeft().getColor()===o.RED?e.isOnLeft()?(e.getLeft().setColor(e.getColor()),e.setColor(r.getColor()),this.rightRotate(r)):(e.getLeft().setColor(r.getColor()),this.rightRotate(e),this.leftRotate(r)):e.isOnLeft()?(e.getRight().setColor(r.getColor()),this.leftRotate(e),this.rightRotate(r)):(e.getRight().setColor(e.getColor()),e.setColor(r.getColor()),this.leftRotate(r)),r.setColor(o.BLACK)):(e.setColor(o.RED),r.getColor()===o.BLACK?this.fixDoubleBlack(r):r.setColor(o.BLACK))}},e.prototype.fixDoubleRed=function(t){if(t!==this.root){var e=t.getParent(),r=e.getParent(),i=t.getUncle();e.getColor()!==o.BLACK&&(null!=i&&i.getColor()===o.RED?(e.setColor(o.BLACK),i.setColor(o.BLACK),r.setColor(o.RED),this.fixDoubleRed(r)):e.isOnLeft()?(t.isOnLeft()?this.swapColors(e,r):(this.leftRotate(e),this.swapColors(t,r)),this.rightRotate(r)):(t.isOnLeft()?(this.rightRotate(e),this.swapColors(t,r)):this.swapColors(e,r),this.leftRotate(r)))}else t.setColor(o.BLACK)},e.prototype.getSuccessor=function(t){for(var e=t;null!=e.getLeft();)e=e.getLeft();return e},e.prototype.insert=function(t){var e=new o(t);if(null==this.root)e.setColor(o.BLACK),this.root=e;else{var r=this.searchNode(t);if(r.getData()===t)return;e.setParent(r),this.comparator(t,r.getData())<0?r.setLeft(e):r.setRight(e),this.fixDoubleRed(e)}},e.prototype.leftRotate=function(t){var e=t.getRight();t===this.root&&(this.root=e),t.moveDown(e),t.setRight(e.getLeft()),null!=e.getLeft()&&e.getLeft().setParent(t),e.setLeft(t)},e.prototype.rightRotate=function(t){var e=t.getLeft();t===this.root&&(this.root=e),t.moveDown(e),t.setLeft(e.getRight()),null!=e.getRight()&&e.getRight().setParent(t),e.setRight(t)},e.prototype.search=function(t){var e=this.searchNode(t);return null!=e&&0===this.comparator(e.getData(),t)},e.prototype.searchNode=function(t){for(var e=this.root;null!=e;)if(this.comparator(t,e.getData())<0){if(null==e.getLeft())break;e=e.getLeft()}else{if(t===e.getData())break;if(null==e.getRight())break;e=e.getRight()}return e},e.prototype.swapColors=function(t,e){var r=t.getColor();t.setColor(e.getColor()),e.setColor(r)},e.prototype.swapValues=function(t,e){var r=t.getData();t.setData(e.getData()),e.setData(r)},e}(e),n=function(t){function e(e){t.call(this,e),this.root=null}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.add=function(t){return!this.search(t)&&(this.insert(t),!0)},e.prototype.delete=function(t){this.root=this.deleteRecursive(this.root,t)},e.prototype.deleteRecursive=function(t,e){if(null==t)return null;if(0===this.comparator(e,t.getData())){if(null==t.getLeft()&&null==t.getRight())return null;if(null==t.getRight())return t.getLeft();if(null==t.getLeft())return t.getRight();var r=this.findSmallestValue(t.getRight());return t.setData(r),t.setRight(this.deleteRecursive(t.getRight(),r)),t}return this.comparator(e,t.getData())<0?(t.setLeft(this.deleteRecursive(t.getLeft(),e)),t):(t.setRight(this.deleteRecursive(t.getRight(),e)),t)},e.prototype.findSmallestValue=function(t){return null==t.getLeft()?t.getData():this.findSmallestValue(t.getLeft())},e.prototype.insert=function(t){this.root=this.insertRecursive(this.root,t)},e.prototype.insertRecursive=function(t,e){if(null==t)return new r(e);if(this.comparator(e,t.getData())<0)t.setLeft(this.insertRecursive(t.getLeft(),e));else{if(!(this.comparator(e,t.getData())>0))return t;t.setRight(this.insertRecursive(t.getRight(),e))}return t},e.prototype.search=function(t){return this.searchTree(this.root,t)},e.prototype.searchTree=function(t,e){return 0===this.comparator(e,t.getData())||!(null==t.getLeft()||!this.searchTree(t.getLeft(),e))||!(null==t.getRight()||!this.searchTree(t.getRight(),e))},e}(e),s=function(t){function e(e){t.call(this),this.name="ArgumentNullException",this.message="object is null.",e&&(this.message=e)}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(Error),a=function(t){function e(e){t.call(this),this.name="ArgumentOutOfRangeException",this.message="arrayIndex is out of range.",this.message=e}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(Error),h=function(t){function e(e){t.call(this),this.name="ArgumentException",this.message="Invalid argument.",e&&(this.message=e)}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(Error),u=function(t){function e(e){t.call(this),this.name="InvalidOperationException",this.message="Invalid operation.",e&&(this.message=e)}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(Error),l=function(t){this.data=[],t&&(this.data=[].concat(t))};l.prototype.add=function(t){return this.data.push(t),!0},l.prototype.clear=function(){this.data.length=0},l.prototype.contains=function(t){return this.indexOf(t)>-1},l.prototype.dequeue=function(){if(this.isEmpty())throw new u("queue is empty.");var t=this.data[0];return this.data.splice(0,1),t},l.prototype.dequeueLast=function(){if(this.isEmpty())throw new u("queue is empty.");var t=this.data[this.data.length-1];return this.data.splice(this.data.length-1,1),t},l.prototype.enqueue=function(t){this.add(t)},l.prototype.enqueueFirst=function(t){this.insert(0,t)},l.prototype.exists=function(t){if(!t)throw new s("predicate is null.");return this.data.some(t)},l.prototype.find=function(t){return this.data.find(t)||null},l.prototype.findAll=function(t){var e=this.data.filter(t);return new l(e)},l.prototype.findIndex=function(t,e,r){if(!t)throw new s("predicate is null.");if(e=e||0,r=r||this.size()-1,e<0||e>=this.size())throw new a("startIndex is not a valid index.");if(r<0)throw new a("count is less than 0.");if(e+r>this.size())throw new a("startIndex and count do not specify a valid section in the list.");for(var o=-1,i=e;i<e+r;++i)if(t(this.data[i])){o=i;break}return o},l.prototype.findLast=function(t){if(!t)throw new s("predicate is null.");for(var e=null,r=this.data.length-1;r>=0;--r){var o=this.data[r];if(t(o)){e=o;break}}return e},l.prototype.findLastIndex=function(t,e,r){if(!t)throw new s("predicate is null.");if(e<0||e>=this.size())throw new a("startIndex is not a valid index.");if(r<0)throw new a("count is less than 0.");if(e+r>this.size())throw new a("startIndex and count do not specify a valid section in the list.");for(var o=-1,i=(e=e||0)+(r=r||this.size())-1;i>=e;--i)if(t(this.data[i])){o=i;break}return o},l.prototype.forEach=function(t){if(!t)throw new s("action is null.");this.data.forEach(function(e){return e?t(e):void 0})},l.prototype.get=function(t){if(null==t)throw new s("index is null.");if(t<0)throw new a("index is less than 0.");if(t>=this.size())throw new a("index is greater than or equal to "+this.size()+".");return this.data[t]},l.prototype.indexOf=function(t){return this.data.findIndex(function(e){return e===t})},l.prototype.insert=function(t,e){if(t<0)throw new a("index is less than 0.");if(0!==t&&t>=this.size())throw new a("index is greater than or equal to "+this.size()+".");this.data.splice(t,0,e)},l.prototype.isEmpty=function(){return 0===this.data.length},l.prototype.lastIndexOf=function(t){return this.data.lastIndexOf(t)},l.prototype.peek=function(){return this.isEmpty()?null:this.get(0)},l.prototype.peekLast=function(){return this.isEmpty()?null:this.get(this.size()-1)},l.prototype.poll=function(){if(this.isEmpty())return null;var t=this.data[0];return this.data.splice(0,1),t},l.prototype.pollLast=function(){if(this.isEmpty())return null;var t=this.data[this.size()-1];return this.data.splice(this.size()-1,1),t},l.prototype.remove=function(t){var e=this.findIndex(function(e){return e===t});return-1!==e&&(this.removeAt(e),!0)},l.prototype.removeAll=function(t){if(!t)throw new s("predicate is null.");var e=this.data.length;return this.data=this.data.filter(function(e){return!t(e)}),e-this.data.length},l.prototype.removeAt=function(t){if(t<0)throw new a("index is less than 0.");if(t>=this.size())throw new a("index is greater than or equal to "+this.size()+".");this.data.splice(t,1)},l.prototype.removeRange=function(t,e){if(t<0)throw new a("index is less than 0.");if(e<0)throw new a("count is less than 0.");if(t+e>this.size())throw new h("index and count do not denote a valid range of elements in the list.");for(var r=0;r<e;)this.removeAt(t),r++},l.prototype.reverse=function(){this.data.reverse()},l.prototype.set=function(t,e){if(t<0)throw new a("index is less than 0.");if(t>=this.size())throw new a("index is greater than or equal to "+this.size()+".");this.data[t]=e},l.prototype.size=function(){return this.data.length},l.prototype.sort=function(t){t||(t=function(t,e){return t>e?1:-1}),this.data.sort(t)},l.prototype.toArray=function(){return[].concat(this.data)};var p=function(t){this.comparator=function(t,e){return t-e},t&&(this.comparator=t),this.tree=new i(this.comparator)};p.prototype.add=function(t){return!this.tree.search(t)&&(this.tree.insert(t),!0)},p.prototype.clear=function(){this.tree.clear()},p.prototype.contains=function(t){return this.tree.contains(t)},p.prototype.isEmpty=function(){return this.tree.isEmpty()},p.prototype.remove=function(t){return this.tree.remove(t)},p.prototype.size=function(){return this.tree.size()},p.prototype.toArray=function(){return this.tree.toArray()},t.AbstractTree=e,t.BinarySearchTree=i,t.BinaryTree=n,t.List=l,t.TreeNode=r,t.TreeSet=p});
//# sourceMappingURL=index.umd.js.map
