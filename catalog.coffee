class Catalog
	constructor: (@mainId) ->

	# Generate catalog
	# @return {Element}
	genCatalog: () ->
		content = document.getElementById @mainId
		children = content.childNodes
		rootDiv = document.createElement 'div'
		@nodeArr = [rootDiv]
		@targetArr = [rootDiv]
		stack = [
			node: 0
			range: 0
		]

		for child in children
			if child.tagName in ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
				@targetArr.push child
				range = parseInt child.tagName.substr 1

				catNode = document.createElement 'li'

				catAnchorNode = document.createElement 'a'
				catAnchorNode.innerHTML = child.innerHTML

				catNode.appendChild catAnchorNode

				@nodeArr.push catNode

				if range is stack[stack.length - 1].range
					stack.pop()
				else if range < stack[stack.length - 1].range
					stack.pop() while range <= stack[stack.length - 1].range
				else
					subCat = document.createElement 'ul'
					@nodeArr[stack[stack.length - 1].node].appendChild subCat
				stack.push
					node: @nodeArr.length - 1
					range: range

				@nodeArr[stack[stack.length - 2].node].lastChild.appendChild catNode

		@nodeArr[0]

	# Process every row in catalog
	# @param {Function} fn 
	#     fn(row, children, target, index) { ... }
	#         `row` is current row, 
	#         `children` is sub-cat behind the row, 
	#         `target` is the element which the row refers to,
	#         `index` is the index of the row.
	each: (fn) ->
		targetArr = @targetArr
		@nodeArr.forEach (node, index, Arr) ->
			fn node.firstChild, node.childNodes[1], targetArr[index], index if index isnt 0