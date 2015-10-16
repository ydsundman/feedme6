if (Meteor.isClient) {
  Meteor.startup(() => {
    $(".button-collapse").sideNav();
  });
}

  if (Meteor.isServer) {
  Meteor.startup(() => {
    console.log('Starting feedme6');
  });
}
