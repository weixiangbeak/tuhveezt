const APIKEY = "60190dbd6adfba69db8b6c8d";

$("#task-button").on("click", function (e) {
    // prevent default action of the button
    e.preventDefault();

    // retrieve form values
    let taskContent= $("#task-content").val();

    // get form values when user clicks
    let jsondata = {
        "task": taskContent
    };

    // creating AJAX settings
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tuhveezt-1b53.restdb.io/rest/tasks",
        "method": "POST", 
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
    }

    // sends request to DB
    $.ajax(settings).done(function (response) {
        console.log(response);
        getTasks();
    });

})


$("#task-result").on("click", ".delete", function (e) {
  // prevent default action of the button
  e.preventDefault();
  var temp = $(this).data("id")
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://tuhveezt-1b53.restdb.io/rest/tasks/${temp}`,
    "method": "DELETE",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    getTasks();
  });

})


$("#task-result").on("click", ".update", function (e) {
  // prevent default action of the button
  e.preventDefault();
  var str = $('#thingy-1').val()
  $('#thingy-1').val("");
  var jsondata = {"task": str};
  var temp = $(this).data("id")
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://tuhveezt-1b53.restdb.io/rest/tasks/${temp}`,
    "method": "PUT",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(jsondata)
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
    getTasks();
  });

})


$("#task-result").on("click", ".checkmark", function (e) {
  // prevent default action of the button
  e.preventDefault();

  // retrieve form values
  var newval = $(this).data("task")
  let taskContent= newval

  // get form values when user clicks
  let jsondata = {
      "task": taskContent
  };

  // creating AJAX settings
  let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://tuhveezt-1b53.restdb.io/rest/tasks-completed",
      "method": "POST", 
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata)
  }

  // sends request to DB
  $.ajax(settings).done(function (response) {
      console.log(response);
  });

  var temp = $(this).data("id")
  let settings2 = {
    "async": true,
    "crossDomain": true,
    "url": `https://tuhveezt-1b53.restdb.io/rest/tasks/${temp}`,
    "method": "DELETE",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    }
  }

  $.ajax(settings2).done(function (response) {
    console.log(response);
    getTasks();
    getCompletedtasks();
  });

})


$("#completed-tasks").on("click", ".delete2", function (e) {
  // prevent default action of the button
  e.preventDefault();
  var temp = $(this).data("id")
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://tuhveezt-1b53.restdb.io/rest/tasks-completed/${temp}`,
    "method": "DELETE",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    getCompletedtasks();
  });

})


function getTasks(all = true) {
  // creating ajax settings
  let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://tuhveezt-1b53.restdb.io/rest/tasks",
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
  }
  
  $.ajax(settings).done(function (response) {
    let content = "";

    for (var i = 0; i < response.length; i++) {

      content = `${content}<tr id='${response[i]._id}'>
      <td class="item">

      <input type="checkbox" value="" id="flexCheckDefault" class="checkmark form-check-input" data-id='${response[i]._id}' data-task='${response[i].task}'>
      <label class="form-check-label" for="flexCheckDefault"></label><span id="task-span" class="task-span">
      ${response[i].task}</span></td>
      <td class="underline"><button type="button" id='task-delete' class='delete option button-design btn btn-danger btn-sm table-button' data-id='${response[i]._id}'>Delete</button></td>
      <td class="underline"><button type="button" id='task-update' class='update option button-design btn btn-info btn-sm table-button' data-id='${response[i]._id}'>Edit</button></td>
      </tr>`;

    }

    $("#task-result tbody").html(content);
    console.log('done');
    });

  }


function getCompletedtasks(all = true) {
  // creating ajax settings
  let settings2 = {
    "async": true,
    "crossDomain": true,
    "url": "https://tuhveezt-1b53.restdb.io/rest/tasks-completed",
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    },
  }

  $.ajax(settings2).done(function (response) {
    let content = "";

    for (var i = 0; i < response.length; i++) {

      content = `${content}<tr id='${response[i]._id}'>
      <td class="item"><span id="task-span" class="task-span">
      ${response[i].task}</span></td>
      <td class="underline"><button type="button" id='task-delete2' class='delete2 option button-design btn btn-danger btn-sm table-button' data-id='${response[i]._id}'>Delete</button></td>
      </tr>`;

    }

    $("#completed-tasks tbody").html(content);
    console.log('done');
    });
}
