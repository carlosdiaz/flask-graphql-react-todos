from ariadne import QueryType, MutationType
from uuid import uuid4

query = QueryType()
mutation = MutationType()

todos = []


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

@query.field("todos")
def resolve_todos(_, info):
    """
    This is the method that will be hit every time there's a GraphQL request

    :param _:
    :param info:
    :return:
    """
    print("Displaying the todos list: ", todos)
    print(info)
    return todos


@mutation.field("createTodo")
def resolve_todos(_, info, name, description, priority):
    """
    This method will be resolving every time there's a new todo task will be created
    :param _:
    :param info:
    :param todo_name:
    :param todo_description:
    :return:
    """
    new_todo_obj = Todos(name, description, priority)
    todos.append(new_todo_obj)
    return new_todo_obj


# @query.field("id")
# def resolve_id(_, info):
#
#     if len(todos) > 0:
#         return todos[0].id
#     return ''


@query.field("todo")
def resolve_todo(*args, name=None, **kwargs):
    for element in todos:
        if element.name == name:
            return element


# def my_wrapper(*args, wrapper_argument=False, **kwargs):
