# movie-app
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

    Register, Login & Logout

    Admin:

     Movies:
        GET: will list movies
        POST: can add movies
        Delete: can delete movies
        PUT: Edit movie(Title, rate, stock)

    Customers:
        GET: Can view total active customers
        PATCH: Can lock customers ( send ID as query param )
        GET: View a customer ( send ID as query param )
        Delete: Can delete customer ( send ID as query param )

    Rental:
        GET: View movies currently at rental with customer info
        DELETE: Delete a rental
        PATCH: Pause a rental

        -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 

        
Client:

    Movies:
        GET: List movies
        POST: Add to favourites

    Rental:
        GET: View movies currently at rental with customer info
        POST: Cancel a rental

    Wishlist:
        GET: List favourites movies(A rent button will redirect to rental screen with this movie as first option)

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
Future Scope: 

        Staff & Payment(Due for future, no need to work on them) ok then complete the back - end part first.after this we will start work on client - side.
        Stock handling is left as a future scope as well.

#Info.

    1. People will codeclouds as the email domain will be an admin.
    2. When a client does a rental, it will create a customer AND a rental, customers are ONLY visible to admin(s).
    3. Both customers (clients) and Admin will be stored in the USER collection.
    4. We can understand a user is Admin or Client, by /me endpoint.

Project requirements: Node js & MongoDB
