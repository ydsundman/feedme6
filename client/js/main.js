
const PAGE_NAME = {SHOPPING:'Shop', EDITING:'Edit shopping list', SETTINGS_ITEMS:'Item settings', SETTINGS_STORES:'Store settings'};

Template.nav.events({
  'click .shop': (e) => {
    Session.set('page', 'SHOPPING');
    e.preventDefault();
  },
  'click .edit': (e) => {
    Session.set('page', 'EDITING');
    e.preventDefault();
  },
  'click a[name="settings-items"]': (e) => {
    Session.set('page', 'SETTINGS_ITEMS');
    e.preventDefault();
  },
  'click a[name="settings-stores"]': (e) => {
    Session.set('page', 'SETTINGS_STORES');
    e.preventDefault();
  }
});

Template.bodyTemplate.helpers({
  isLoggedIn() {
    return !!Meteor.userId();
  }
});

const mainAndNavHelpers = {
  pageIs(page) {
    Session.setDefault('page', 'SHOPPING');
    return page === "SETTINGS"? Session.get('page').lastIndexOf('SETTINGS',0) === 0: Session.get('page') === page;
  }
};

Template.main.helpers(mainAndNavHelpers);
Template.navContent.helpers(mainAndNavHelpers);

Template.nav.helpers({
  currentPage() {
    return PAGE_NAME[Session.get('page')];
  }
});

Template.nav.rendered = () => {
  $('.button-collapse').sideNav({
    closeOnClick: true
  });
  $('.settings-dropdown').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });
};
