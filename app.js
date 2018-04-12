var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope, $http) {
  
  // LOGIN PAGE
  
  // SET initial loading page to login page.
  $scope.loginPage = true;
  $scope.directoryPage = false;
  $scope.schedulePage = false;
  $scope.contactPage = false;
  $scope.scheduleShow = false;
 
  // SET initial values for log in variables.
  $scope.username = ""; 
  $scope.password = "";
  $scope.loginFeedback = "";
  $scope.validUsername = false; 
  $scope.validPassword = false; // Having valid username & password must be false as it has NOT been checked against the server yet.
  $scope.myData = null; // Variable where JSON elements currently looked at in the array will be stored.
  
 // GET user list from the JSON server.
  $scope.promise = $http.get('https://happybuildings.sim.vuw.ac.nz/api/umaligus/user_list.json')
    .then(
      function sucessCall(response) {
        $scope.myData = response.data.users;
        $scope.loginFeedback = "User list read successfully."; // Inform whether data from json file CAN be read.
      },
      function errorCall(response) {
        $scope.feedback = "Error reading file:" + response.status; // Inform whether data from json file CANNOT be read.
        $scope.myData = null;
      }
    );

  // OWNER LOG IN. Functions when owner clicks the login button.
  $scope.ownerLogin = function() {
    
    if($scope.myData === null) {
      $scope.loginFeedback = "Error reading file";
      }
    
    // Checks user type, username and password against user server.
    for (i = 0; $scope.myData !== null && i < $scope.myData.length; i++) { // Iterates data retrived from the server, one element at a time (loop).
      if ($scope.myData[i].UserType == $scope.usertype && $scope.myData[i].LoginName == $scope.username && $scope.myData[i].Password == $scope.password) {
        $scope.validUsername = true;
        $scope.validPassword = true;
        }
      }
    
      if ($scope.validUsername && $scope.validPassword) { // Checks whether username and password combination is contained in the server.
        $scope.username = "";
        $scope.password = ""; // Clears input fields.
        
        $scope.homePage = true; 
        $scope.loginPage = false; // Hides login page and shows login successful notification.
        }
      
      else { // When combination is not found in the server.
        $scope.username = ""; 
        $scope.password = ""; // Clears input fields.
        $scope.loginFeedback = "Login failed. Please re-enter login details.";
        }
    };
  
  // MANAGER LOG IN.
  $scope.managerLogin = function() {
    
    if($scope.myData === null) {
      $scope.feedback = "Error reading file";
      }

    for (i = 0; $scope.myData !== null && i < $scope.myData.length; i++) {
      if ($scope.myData[i].UserType == $scope.usertype && $scope.myData[i].Password == $scope.password) {
        $scope.validUsername = true; 
        $scope.validPassword = true;
        }
      }
      
      if ($scope.validUsername && $scope.validPassword) { 
        $scope.username = "";
        $scope.password = "";
        
        $scope.homePage = true; 
        $scope.loginPage = false;
        } 
      
      else {
        $scope.username = "";
        $scope.password = "";
        $scope.loginFeedback = "Login failed. Please re-enter login details.";
        }
    };
    
  // CONTRACTOR LOGIN.
  $scope.contractorLogin = function() {

    if($scope.myData === null) {
      $scope.feedback = "Error reading file";
      }

    for (i = 0; $scope.myData !== null && i < $scope.myData.length; i++) {
      if ($scope.myData[i].UserType == $scope.usertype && $scope.myData[i].LoginName == $scope.username && $scope.myData[i].Password == $scope.password) {
        $scope.validUsername = true;
        $scope.validPassword = true;
        }
      }
      
      if ($scope.validUsername && $scope.validPassword) { 
        $scope.username = "";
        $scope.password = "";
        
        $scope.homePage = true; 
        $scope.loginPage = false;
        } 
      
      else {
        $scope.username = "";
        $scope.password = "";
        $scope.loginFeedback = "Login failed. Please re-enter login details.";
        }
    };
  
  // RESET (clear) login input fields.
  $scope.loginCancel=function(){
    $scope.usertype = null;
    $scope.username = "";
    $scope.password = "";
    $scope.loginFeedback = "Input fields cleared.";
  };
  
  // GO to forgot password form.
  $scope.loginShow = true; // Shows login form initially.
  $scope.resetShow = false; // Hides forgot password form initially.
  
  $scope.loginReset=function(){
    $scope.loginShow = false;
    $scope.resetShow = true; // Shows forgot password form.
  };
  
  // FORGOT PASSWORD PAGE
  
  // VALIDATE email input against variable identified.
  $scope.resetSubmit=function(){
  
    var builderEmail = "builder@email.com";
  
    if($scope.email == builderEmail){
    $scope.resetFeedback = "Reset instructions sent to email.";
    }
  
    else{$scope.resetFeedback = "Please enter a valid email address.";
    }
  };
  
  // RETURN to login form.
  $scope.resetCancel=function(){
    $scope.loginShow = true;
    $scope.resetShow = false;
  };
  
  // NAVIGATION BAR
  
  // Directory Page.
  $scope.goDirectory=function(){
    $scope.homePage = false;
    $scope.directoryPage = true;
    $scope.schedulePage = false;
    $scope.contactPage = false;
    $scope.loginPage = false;
    
    $scope.directoryShow = true;
    $scope.buildingInfo = false;
    $scope.buildingShow = false;
    $scope.projectShow = false;
    $scope.workShow - false;
  };
  
  // Project Schedule Page.
  $scope.goSchedule=function(){
    $scope.directoryPage = false;
    $scope.schedulePage = true;
    $scope.contactPage = false;
    $scope.loginPage = false;
    $scope.scheduleShow = true;
  };
  
  // Contact Page.
  $scope.goContact=function(){
    $scope.directoryPage = false;
    $scope.schedulePage = false;
    $scope.contactPage = true;
    $scope.loginPage = false;
  };
  
  // Log-out.
  $scope.goLogout=function(){
    $scope.loginPage = true;
    $scope.directoryPage = false;
    $scope.schedulePage = false;
    $scope.contactPage = false;
    
    $scope.username = "";
    $scope.password = "";
    $scope.usertype = "";
    $scope.validUsername = false; 
    $scope.validPassword = false;
    $scope.loginFeedback = "You have logged out successfully."
  };
  
  // BUILDING DIRECTORY PAGE

  // SET initial values for building variables.
  $scope.buildingData = null;
  
  // GET building list from the JSON server.
  $scope.promise1 = $http.get('https://happybuildings.sim.vuw.ac.nz/api/umaligus/building_dir.json')
    .then(
      function sucessCall(response) {
        $scope.buildingData = response.data.buildings;
        $scope.buildingServer = "File read successfully."; // Inform whether data from json file CAN be read.
      },
      function errorCall(response) {
        $scope.buildingServer = "Error reading file: " + response.status; // Inform whether data from json file CANNOT be read.
        $scope.buildingData = null;
      }
  );
  
  // POST building to the JSON server using ADD BUILDING form.
  var read = 'https://happybuildings.sim.vuw.ac.nz/api/umaligus/building_dir.json';
  var write = 'https://happybuildings.sim.vuw.ac.nz/api/umaligus/update.building.json';

  // SUBMIT button for adding a new building.
  $scope.buildingSubmit = function() {
  var sourceObj = { 
	  "ID": $scope.buildingID,
    "Owner": $scope.buildingOwner,
	  "Address": $scope.buildingAddress,
    "BuildingType": $scope.buildingType,
    "ConstructionDate": $scope.buildingDate
  }
    
  $scope.promise2 = $http ({
      method: "POST",
      url: write,
      data: sourceObj,
      headers: {'Content-Type': 'application/json'}
      })
      
    .then(
      function sucessCall(response) { 
      $scope.feedback = "Post>> " + JSON.stringify(sourceObj);
      }, 
      
      function errorCall(response) {
      $scope.feedback = "Error posting:" + " Status: "+ response.status + " Writing: " + JSON.stringify(sourceObj);
      }
    );
  };
  
  // GO to add building form - ADD a new building.
  $scope.addBuilding=function(){
    $scope.buildingShow = true;
    $scope.directoryShow = false;
  };
  
  // CLEAR input fields from add new building form.
  $scope.buildingReset=function(){
    $scope.buildingID = "";
    $scope.buildingOwner = "";
    $scope.buildingAddress = "";
    $scope.buildingType = "";
    $scope.buildingDate = "";
  };

  // RETURN from add building form - CANCEL.
  $scope.buildingCancel=function(){
    $scope.directoryShow = true;
    $scope.buildingShow = false;
  };
  
  // VIEW building information from directory. Redirect to building information page.
  $scope.setSelectedBuilding = function(building) {
    $scope.selectedBuilding = building;
    $scope.directoryShow = false;
    $scope.buildingInfo = true;
  };
	    
  // DELETE a building from directory (not permanently).
  $scope.deleteBuilding = function(index) {
    $scope.buildingData.splice(index, 1)
  };
  
  // BUILDING INFORMATION PAGE
  
  // NAVIGATING from building directory to building information - SETS building directory to show as default.
  $scope.directoryShow = true;

  // RETURN to building directory from view building information.
  $scope.buildingBack=function(){
    $scope.directoryShow = true;
    $scope.buildingInfo = false;
    $scope.projectTable = false;
    $scope.buildingprojectInfo = false;
    $scope.emptyProjectList = false;
  };
  
  // EDIT building information. *NOT WORKING
  $scope.entity = {};
  
  $scope.editBuilding = function(index) {
    $scope.entity = $scope.buildingData[index];
    $scope.entity.building = index;
    $scope.entity.editable = true;
  };
  
  // SAVE building information. *NOT WORKING
  $scope.saveBuilding = function(index) {
    $scope.buldingData[index].editable = false;
  };

  // SHOW add project form.
  $scope.addProject=function(){
    $scope.buildingInfo = false;
    $scope.projectShow = true;
  };
  
  // RETURN to building information from add project form - CANCEL.
  $scope.projectCancel=function(){
    $scope.buildingInfo = true;
    $scope.projectShow = false;
  };
  
  // RESET (clear) project form input fields.
  $scope.projectReset=function(){
    $scope.pname = "";
    $scope.psdate = "";
    $scope.pfdate= "";
    $scope.pstatus = "";
    $scope.pmanager = "";
    $scope.pcontact = "";
    $scope.pcontractor = "";
  };
  
  // VIEW project list specific to a building ID.
  $scope.showProjects=function(id) {
    for (i = 0; $scope.projectData !== null && i < $scope.projectData.length; i++) {
      if ($scope.projectData[i].BuildingID == id) {
        $scope.projectTable = true;
        $scope.projectTable2 = false;
        $scope.currentProject = $scope.projectData[i];
      }
    }
  };
  
  // VIEW project list array.
  $scope.showProjectsArray=function(){
    $scope.projectTable = false;
    $scope.projectTable2 = true;
  };
  
  // VIEW project information when a project is clicked.
  $scope.setSelectedBuildingproject = function(project) {
    $scope.selectedBuildingproject = project;
    $scope.buildingprojectInfo = true;
  };  
  
  // EDIT project status. *NOT WORKING
  $scope.editProject = function(index){
	  $scope.entity = $scope.currentProject[index];
	  $scope.entity.index = index;
	  $scope.entity.editable = true;
	};
	
	$scope.saveProject = function(index){
	  $scope.currentProject[index].editable = false;
	};
	
	// DELETE project from list. *NOT WORKING
	$scope.deleteProject = function(currentProject){
	  $scope.projectData.splice(index,1);
	};
	
	// SIGNAL
	$scope.signalProject = true;
	
	$scope.signalled = function() {
	  $scope.signalProject = false;
	  $scope.signalAlert = true;
	}
	
	$scope.unsignalled = function() {
	  $scope.signalProject = true;
	  $scope.signalAlert = false;
	}
	 
   // WORK LIST && FORM
	$scope.entity = {};
	
	$scope.addWork=function(){
    $scope.currentProject.Works.push({
      TypeOfWork : "",
      Status : "",
      editable : true
    })
  };
	    
	$scope.edit = function(index){
	  $scope.entity = $scope.currentProject.Works[index];
	  $scope.entity.index = index;
	  $scope.entity.editable = true;
	};
	    
	$scope.delete = function(index){
	  $scope.currentProject.Works.splice(index,1);
	};
	    
	$scope.save = function(index){
	  $scope.currentProject.Works[index].editable = false;
	};
  
  // COMMENT AREA
  
  // SUBMIT a comment.
  $scope.aComment = {
    Author : "",
    Text : "",
    editable : true
  };
  
  $scope.comments = []; // Where comments are stored.
  $scope.commentsEntity = {};
  
  $scope.editComment = function(index){
	  $scope.commentsEntity = $scope.comments[index];
	  $scope.commentsEntity.index = index;
	  $scope.commentsEntity.editable = true;
	};
	
	$scope.saveComment = function(index){
	  $scope.comments[index].editable = false;
	};
  
  $scope.deleteComment = function(index){
	  $scope.comments.splice(index,1);
	};
  
  $scope.submitComment = function(Author, Text) {
    $scope.comments.push($scope.aComment);
    $scope.aComment = {}; // Clear comment input fields after added.
  };
    
  // CLEAR input fields for comment.
  $scope.cancelComment=function(){
    $scope.buildingAuthor = "";
    $scope.buildingComment = "";
  };
  
  // PROJECT SCHEDULE PAGE
  
  // GET project list from internal JSON file.
  $scope.promise = $http.get('project_list.json')
  .then(
      function sucessCall(response) {
        $scope.projectData = response.data.projects;
        $scope.projectServer = "File read successfully.";
      },
      function errorCall(response) {
        $scope.projectServer = "Error reading file: " + response.status;
        $scope.projectData = null;
      }
  );
  
  // GO to project information page when project ID is clicked. 
  $scope.setSelectedProject = function(project) {
    $scope.selectedProject = project;
    $scope.scheduleShow = false;
    $scope.projectInfo = true;
  };
  
  // BACK to project schedule table. 
  $scope.projectBack=function(){
    $scope.scheduleShow = true;
    $scope.projectInfo = false;
  };
  
  // VIEW building information from project ID. *NOT WORKING
  $scope.setSelectedProjectbuilding = function(building) {
    for (i = 0; $scope.myData !== null && i < $scope.myData.length; i++)
    if($scope.myData[i].ID == $scope.buildingID){
          $scope.selectedBuilding = building;
          $scope.schedulePage = false;
          $scope.directoryShow = false;
          $scope.buildingInfo = true;
        }
    else{}
  };
	
	// CONTACT PAGE
	
	// SUBMIT feedback form.
  $scope.feedbackSubmit=function(){
    
  };
  
  // CLEAR input fields for feedback form.
  $scope.feedbackCancel=function(){
    $scope.contactFeedback="";
  };
  
  // EXAMPLE ADDING PROJECT USING PROJECT LIST
  $scope.projectEntity = {};
	
	$scope.addProjectX=function(){
    $scope.projectData.push({
      ID : "",
      BuildingID : "",
      Name : "",
      Status : "",
      editable : true
    })
  };
	    
	$scope.editProjectX = function(index){
	  $scope.projectEntity = $scope.projectData[index];
	  $scope.projectEntity.index = index;
	  $scope.projectEntity.editable = true;
	};
	    
	$scope.deleteProjectX = function(index){
	  $scope.projectData.splice(index,1);
	};
	    
	$scope.saveProjectX = function(index){
	  $scope.projectData[index].editable = false;
	};
	
  $scope.project = {
    ProjectID : "",
    Name : "",
    Status : ""
  };
  
  $scope.submitProjectX = function(Name, StartDate, EndDate, Status, ProjectManager, ContactPerson, Contractor) {
    $scope.projectData.push($scope.project);
    $scope.project = {}; // Clear comment input fields after added.
  };

});