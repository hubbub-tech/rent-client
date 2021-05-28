from blubber_orm import Users

from api import celery, create_app

@celery.task
def set_async_timeout(user_id):
    """Background task to unlock items if user does not transact."""
    try:
        async_app = create_app()
        with async_app.app_context():
            user = Users.get(user_id)
            for item in user.cart.contents:
                item.unlock()
        print(f"All items in {user.name}'s cart have been unlocked again.") # TODO: log this
        return True
    except:
        #TODO: write a proper exception handling statement here
        print("The timeout failed.")
        return False
