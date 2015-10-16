List = new Meteor.Collection('list');

if (Meteor.isClient) {
  Meteor.startup(() => {
  });
}

if (Meteor.isServer) {
  Meteor.startup(() => {
    console.log('Starting feedme6');
  });
}
