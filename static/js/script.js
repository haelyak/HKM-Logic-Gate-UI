document.addEventListener('DOMContentLoaded', function() {
    // Initialize Dragula for the toolbox and drop container
    var dragContainer = document.getElementById('drag-container');
    var toolbox = document.querySelector('.toolbox');

    var drake = dragula([toolbox]);

    // Add event listeners for duplicating and dragging new boxes
    var toolboxBoxes = document.querySelectorAll('.toolbox .box');
    toolboxBoxes.forEach(function(box) {
        box.onclick = function() {
            duplicateBox(box.id);
        };
    });

    // Duplicate box in toolbox when clicked and add to drag-container
    function duplicateBox(id) {
        var originalBox = document.getElementById(id);
        var clone = originalBox.cloneNode(true);
        clone.id = id + "-clone";
        clone.onclick = function() {
            this.parentNode.removeChild(this);
        };

        dragContainer.appendChild(clone);
        addDragAndDrop(clone); // Add drag-and-drop to the newly cloned box
    }

    // Add drag-and-drop functionality to cloned boxes
    function addDragAndDrop(element) {
        element.setAttribute("draggable", "true");

        element.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text', e.target.id);
            setTimeout(function() {
                element.style.display = 'none';
            }, 0);
        });

        element.addEventListener('dragend', function() {
            element.style.display = 'block';
        });

        dragContainer.addEventListener('dragover', function(e) {
            e.preventDefault();
            var target = getDropTarget(e);
            if (target) {
                target.classList.add('drag-over');
            }
        });

        dragContainer.addEventListener('dragleave', function(e) {
            var target = getDropTarget(e);
            if (target) {
                target.classList.remove('drag-over');
            }
        });

        dragContainer.addEventListener('drop', function(e) {
            e.preventDefault();
            var target = getDropTarget(e);
            if (target) {
                target.classList.remove('drag-over');
                var data = e.dataTransfer.getData('text');
                var draggedElement = document.getElementById(data);

                var clone = draggedElement.cloneNode(true);
                clone.id = data + "-clone";
                clone.onclick = function() {
                    this.parentNode.removeChild(this);
                };

                target.appendChild(clone);
            }
        });
    }

    // Get the drop target element
    function getDropTarget(event) {
        var element = event.target;
        while (element && !element.classList.contains('drag-container')) {
            element = element.parentNode;
        }
        return element;
    }
});