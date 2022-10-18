function addButtoActions() {
  $(".button-backlog").on("click", function () {
    if (!($(this).closest(".backlog").length > 0)) {
      $(this).parents(".input-group").appendTo(".backlog");
    }
  });

  $(".button-progress").on("click", function () {
    if (!($(this).closest(".in-progress").length > 0)) {
      $(this).parents(".input-group").appendTo(".in-progress");
    }
  });

  $(".button-done").on("click", function () {
    if (!($(this).closest(".done").length > 0)) {
      $(this).parents(".input-group").appendTo(".done");
    }
  });

  $(".button-delete").on("click", function () {
    $(this).parents(".input-group").remove();
  });
}

function addDragAndDrop() {
  $(".drag").on("mousedown", function (e) {
    console.log("click");
    $(this).parent().draggable({
      appendTo: "body",
      cursor: "move",
      helper: "clone",
      revert: "invalid",
    });
  });

  $(".backlog").droppable({
    tolerance: "intersect",
    accept: ".input-group.overflow",
    drop: function (e, ui) {
      $(this).append($(ui.draggable));
    },
  });

  $(".in-progress").droppable({
    tolerance: "intersect",
    accept: ".input-group.overflow",
    drop: function (e, ui) {
      $(this).append($(ui.draggable));
    },
  });

  $(".done").droppable({
    tolerance: "intersect",
    accept: ".input-group.overflow",
    drop: function (e, ui) {
      $(this).append($(ui.draggable));
    },
  });
}

$("#add-button").on("click", function () {
  var newTask = $(this).prev().val();

  if (newTask === "") {
    $(this).prev().val("");
    return alert("Input is empty!");
  }

  var internalElements = $(`
  <div class="input-group overflow">
    <span class="taskTitle drag">${newTask}</span>
    <div class="button-container">
        <span class="button button-backlog">Backlog</span
        ><span class="button button-progress">In Progress</span
        ><span class="button button-done">Done</span
        ><span class="button button-delete">Delete</span>
    </div>
  </div>`);

  $(".backlog").append(internalElements);

  addButtoActions();
  addDragAndDrop();
  $(this).prev().val("");
  $(this).prev().focus();
});

$("input").keypress(function (e) {
  if (e.which == 13) {
    $("#add-button").click();
  }
});
