List = new Meteor.Collection('list');

Pages = {
  SHOPPING: 'SHOPPING',
  EDITING: 'EDITING'
};

if (Meteor.isClient) {
  touchSupported = () => {
    return 'ontouchstart' in window;
  };

  Meteor.startup(() => {
    Session.set('page', Pages.SHOPPING);
    $(".button-collapse").sideNav();
  });
}

if (Meteor.isServer) {
  Meteor.startup(() => {
    console.log('Starting feedme6');
  });
}
