List = new Meteor.Collection('list');

var perms = {
  insert: function(userId, doc) {
    return userId && doc.owner === userId;
  },
  update: function(userId, doc) {
    return doc && doc.owner === userId;
  },
  remove: function(userId, doc) {
    return doc && doc.owner === userId;
  }
};

var deny = {
  update: function(userId, docs, fields) {
    return fields.indexOf('owner') > -1;
  }
};
List.allow(perms);
List.deny(deny);


if (Meteor.isClient) {
  touchSupported = () => {
    return 'ontouchstart' in window;
  };

  Meteor.startup(() => {
    Session.set('page', Pages.SHOPPING);
    $(".button-collapse").sideNav();
    Meteor.subscribe('list');
  });
}

if (Meteor.isServer) {
  Meteor.startup(() => {
    console.log('Starting feedme6');

    Meteor.publish("list", function() {
      return List.find({owner: this.userId});
    });
  });
}
