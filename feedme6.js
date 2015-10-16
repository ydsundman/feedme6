if (Meteor.isClient) {
  Meteor.startup(() => {
    console.log("collapse button set", $(".button-collapse"));
    $(".button-collapse").sideNav();
    console.log("collapse button set");
  });
}

  if (Meteor.isServer) {
  Meteor.startup(() => {
    console.log('Starting feedme6');
  });
}
