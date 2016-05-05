var built = Built.App('bltd37e74f70bdc2c76').persistSessionWith(Built.Session.LOCAL_STORAGE);




var luser;
var user = built.User();
var app = angular.module("todoApp", [])
app.controller('todoRegister', function($scope) {
    var uname, email, pass;
    $scope.onSubmit = function() {
        uname = $scope.uname;
        email = $scope.email;
        pass = $scope.pass;
        user.register(email, pass, pass, {
                username: uname
            })
            .then(function(user) {
                console.log(user.toJSON());

            });
    };
});



app.controller('todoLogin', function($scope) {
    if(built.User.isAuthenticated()){
    	window.location="task.html";
    }
    else{
    var email, pass;

    $scope.onLogin = function() {
        console.log("fhdf");
        email = $scope.email;
        pass = $scope.pass;
        user.login(email, pass)
            .then(function(user) {
            	 $scope.$apply(function() {
                console.log("sucessful login") 
                console.log(user.toJSON());
               var  ruser=user.toJSON();
               luser=ruser.uid;

                window.location="task.html";

            })

            })
    };

}
});




app.controller('taskAddCtrl', function($scope) {
   
   var refresh=function(){
   	$scope.tname="";
   	$scope.tdesc="";

   };

   if( built.User.isAuthenticated()){







    var task_name, task_desc;

    	$scope.useruid = null;
        built.User.getCurrentUser()
			.then(function(user){
			    $scope.useruid = user.data;
				   console.log($scope.useruid.uid);
				   $scope.uuid=$scope.useruid.uid;
				   console.log(user)
    
   //      var query = built.Class("todo_task").Query();
        
   //      query=query.where('app_user_object_uid',$scope.uuid);
   //       query.toJSON().exec()
			// .then(function(data) {
   //      $scope.$apply(function() {

   //          // $scope.tasklist = data;
   //          // $scope.hide=data.status;
   //          console.log(data)

   //      });


   //  });


//dsdsdsdsd
var Query = built.Class('todo_task').Query;
var query = Query();

query1 = query.containedIn('app_user_object_uid',[ $scope.uuid ])
query2 = query.where('share',$scope.uuid);
var queryArray = [query1,query2];
var orQuery = query.or(queryArray);
// query= query.containedIn('uid',[ $scope.uuid ])
orQuery.toJSON().exec()
.then(function(query){
     $scope.$apply(function() {

   console.log(query);
   $scope.tasklist = query;

   });
});


//dsdsds





});




    $scope.taskAdd = function() {
        console.log("add");
        task_name = $scope.tname;
        task_desc = $scope.tdesc;

        var Project = built.Class('todo_task').Object;
        var projectWithUid = Project({
            name: task_name,
            description: task_desc

        });
        projectWithUid.save()
            .then(function(object) {
                $scope.$apply(function() {
                    $scope.tasklist.unshift(object.toJSON())
                    console.log(object.toJSON());
                    refresh();
                });
            });

    };
    $scope.show=true;
    $scope.sharetask=true;
    $scope.status = function(uid, status) {
        console.log(uid + "  " + status)
        var Project = built.Class('todo_task').Object;
        var projectWithUid = Project({
            uid: uid,
            status: status

        });
        projectWithUid.save()
            .then(function(object) {
            	// $scope.hide=status;
               console.log("status updated");
            });

    };




    // $scope.editContent=function($index){
    // 	$scope.edit=false;
    // 	 $scope.save=false;
    // 	 console.log("entered")

    // };
     $scope.taskEdit=function(uid,name,desc){
     	 var Project = built.Class('todo_task').Object;
        var projectWithUid = Project({
            uid: uid,
            name:name,
            description:desc

        });
        projectWithUid.save()
            .then(function(object) {
               console.log("task  updated");
            });
    	

    };

    $scope.taskDelete=function(uid,index){
    	var project = built.Class('todo_task').Object(uid); 
			project.delete()
			.then(function(){
				$scope.$apply(function(object) {
					$scope.tasklist.splice(index,1);

  				 console.log('object deleted successfully')
  				});
		});
    };
    $scope.logout=function(){
			var user = built.User();
			user.logout().then(function(res){
			   console.log("logout successfully");
			   window.location="index.html"
			});
    }
    $scope.share=function(uid){


				//     	 var User = app.User;
				// User.on('presence',function(presence){
				//    console.log(presence.getApplicationUser().toJSON());
				// })
                console.log($scope.uuid);
                    var query = built.Class("built_io_application_user").Query();
                    query  = query.notContainedIn('uid',[$scope.uuid])
                     query.toJSON().exec()
                        .then(function(data) {
                    $scope.$apply(function() {
                        $scope.userlist1=data;
                        console.log(data)

                    });
                });




         $scope.refer=function(ruid){
           
        console.log($scope.selected.uid);
      
        console.log("object "+ruid);
        var Project = built.Class('todo_task').Object;
        var projectWithUid = Project({
            uid: uid,
            share:ruid

        });
        projectWithUid.save()
            .then(function(object) {
                 $scope.$apply(function() {
               console.log("Refrences Added successfully");
             console.log(object.toJSON())


               });
            });
        
    }


    }

}
else{
	window.location="index.html"
}

});
