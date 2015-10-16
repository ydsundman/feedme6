List = new Meteor.Collection('list');

Pages = {
  SHOPPING: 'SHOPPING',
  EDITING: 'EDITING'
};

if (Meteor.isClient) {
  Meteor.startup(() => {
    Session.set('page', Pages.SHOPPING);
  });
}

if (Meteor.isServer) {
  Meteor.startup(() => {
    console.log('Starting feedme6');
  });
}
