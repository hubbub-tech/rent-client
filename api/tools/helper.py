
def blubber_instances_to_dict(list_of_instances):
    """Convert a list of blubber model instances into dictionaries for frontend."""
    dictionaried_list = []
    for _instance in list_of_instances:
        instance = _instance.to_dict()
        dictionaried_list.append(instance)
    return dictionaried_list
