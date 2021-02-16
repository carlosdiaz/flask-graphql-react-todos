from ariadne import QueryType, MutationType
from uuid import uuid4

query = QueryType()
mutation = MutationType()

orders = []


class Todos:

    def __init__(self, name, description, priority):
        """
        Class description for the Todos model, very simple
        :param todo_name:
        :param todo_description:
        :param priority:
        """
        self.id = uuid4()
        self.name = name
        self.description = description
        self.priority = priority


@query.field("orders")
def resolve_orders(_, info):
    """
    This is the method that will be hit every time there's a GraphQL request

    :param _:
    :param info:
    :return:
    """
    print("Displaying the orders: ", orders)
    print(info)
    return orders


@mutation.field("createTodo")
def resolve_orders(_, info, name, description, priority):
    """
    This method will be resolving every time there's a new todo task will be created
    :param _:
    :param info:
    :param todo_name:
    :param todo_description:
    :return:
    """
    new_todo_obj = Todos(name, description, priority)
    orders.append(new_todo_obj)
    return new_todo_obj
