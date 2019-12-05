db.createUser({
    user:"root",
    pwd: "ervamate",
    roles: [
        {
            role : "readWrite",
            db: "petshop"
        }
    ]
})