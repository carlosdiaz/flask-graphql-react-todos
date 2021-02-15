from ariadne import QueryType, MutationType
from uuid import uuid4

query = QueryType()
mutation = MutationType()

todos_list = []


class Todo:

    def __init__(self, name, description, priority):
        """
        Class description for the Todo model, very simplistic
        :param todo_name:
        :param todo_description:
        :param priority:
        """
        self.id = uuid4()
        self.name = name
        self.description = description
        self.priority = priority


@query.field("todos")
def resolve_todos(_, info):
    """
    This is the method that will be hit every time there's a GraphQL request

    :param _:
    :param info:
    :return:
    """
    print("Displaying the orders: ", todos_list)
    print(info)
    return todos_list


@mutation.field("createTodo")
def resolve_orders(_, info, todo_name, todo_description):
    """
    This method will be resolving every time there's a new TODO task created
    :param _:
    :param info:
    :param todo_name:
    :param todo_description:
    :return:
    """
    new_todo_obj = Todo(todo_name, todo_description)
    todos_list.append(new_todo_obj)
    return new_todo_obj
