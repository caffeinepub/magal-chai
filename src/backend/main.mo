import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  public type MenuItem = {
    id : Nat;
    name : Text;
    description : Text;
    priceCents : Nat;
    category : Text;
    isVegan : Bool;
    isAvailable : Bool;
  };

  public type OrderItem = {
    menuItemId : Nat;
    quantity : Nat;
  };

  public type Order = {
    id : Nat;
    customerName : Text;
    contact : Text;
    items : [OrderItem];
    totalAmountCents : Nat;
    status : Text;
  };

  var nextMenuItemId = 0;
  var nextOrderId = 0;

  let menuItems = Map.empty<Nat, MenuItem>();
  let orders = Map.empty<Nat, Order>();

  public shared ({ caller }) func addMenuItem(name : Text, description : Text, priceCents : Nat, category : Text, isVegan : Bool, isAvailable : Bool) : async MenuItem {
    let id = nextMenuItemId;
    nextMenuItemId += 1;

    let menuItem : MenuItem = {
      id;
      name;
      description;
      priceCents;
      category;
      isVegan;
      isAvailable;
    };

    menuItems.add(id, menuItem);
    menuItem;
  };

  public query ({ caller }) func getAllMenuItems() : async [MenuItem] {
    menuItems.values().toArray();
  };

  public query ({ caller }) func getMenuItemsByCategory(category : Text) : async [MenuItem] {
    menuItems.values().filter(func(item) { item.category == category }).toArray();
  };

  public shared ({ caller }) func placeOrder(customerName : Text, contact : Text, items : [OrderItem], totalAmountCents : Nat) : async Order {
    let id = nextOrderId;
    nextOrderId += 1;

    let order : Order = {
      id;
      customerName;
      contact;
      items;
      totalAmountCents;
      status = "pending";
    };

    orders.add(id, order);
    order;
  };

  public query ({ caller }) func getOrderById(id : Nat) : async Order {
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    orders.values().toArray();
  };

  public shared ({ caller }) func updateOrderStatus(id : Nat, newStatus : Text) : async () {
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder : Order = {
          id = order.id;
          customerName = order.customerName;
          contact = order.contact;
          items = order.items;
          totalAmountCents = order.totalAmountCents;
          status = newStatus;
        };
        orders.add(id, updatedOrder);
      };
    };
  };
};
