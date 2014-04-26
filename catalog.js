// Generated by CoffeeScript 1.7.1
var Catalog;

Catalog = (function() {
  function Catalog(mainId) {
    this.mainId = mainId;
  }

  Catalog.prototype.genCatalog = function() {
    var catAnchorNode, catNode, child, children, content, range, rootDiv, stack, subCat, _i, _len;
    content = document.getElementById(this.mainId);
    children = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
    rootDiv = document.createElement('div');
    this.nodeArr = [rootDiv];
    this.targetArr = [rootDiv];
    stack = [
      {
        node: 0,
        range: 0
      }
    ];
    for (_i = 0, _len = children.length; _i < _len; _i++) {
      child = children[_i];
      this.targetArr.push(child);
      range = parseInt(child.tagName.substr(1));
      catNode = document.createElement('li');
      catAnchorNode = document.createElement('a');
      catAnchorNode.innerHTML = child.innerHTML;
      catNode.appendChild(catAnchorNode);
      this.nodeArr.push(catNode);
      if (range === stack[stack.length - 1].range) {
        stack.pop();
      } else if (range < stack[stack.length - 1].range) {
        while (range <= stack[stack.length - 1].range) {
          stack.pop();
        }
      } else {
        subCat = document.createElement('ul');
        this.nodeArr[stack[stack.length - 1].node].appendChild(subCat);
      }
      stack.push({
        node: this.nodeArr.length - 1,
        range: range
      });
      this.nodeArr[stack[stack.length - 2].node].lastChild.appendChild(catNode);
    }
    return this.nodeArr[0].firstChild;
  };

  Catalog.prototype.each = function(fn) {
    var targetArr;
    targetArr = this.targetArr;
    return this.nodeArr.forEach(function(node, index, Arr) {
      if (index !== 0) {
        return fn(node.firstChild, node.childNodes[1], targetArr[index], index - 1);
      }
    });
  };

  return Catalog;

})();
