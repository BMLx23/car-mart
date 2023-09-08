# CarCar
CarCar is an application for managing aspects of an automobile dealership-- specifically its inventory, service center, and sales.

##### Team:

* Brian La - Service
* Emily Yim - Sales

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

Purpose of this microservice is to keep track of service appointments for automobiles and their owners.

3 Models:
Technician: first name, last name, and employee id
AutomobileVO: will poll the 'vin' and 'sold' fields from Automobile model in inventory and will be used for the special feature.
Appointment: Keeps track of date/time, reason, status, vin, customer name, technician (selected from technician model), and will gather extra data to compare if the customer's vin matches a vin from the automobileVO so that we know if they are a VIP.

Special Feature:
If the VIN in the appointment matches a VIN from the AutomobileVO, then it means that it was sold through us and are considered a VIP.

## Sales microservice

The purpose of this microservice is to keep track of automobile sales that come from the inventory. A salesperson cannot sell a car that isn't list in the inventory, nor can they sell a car that has already been sold.

On the backend, I created models for Salesperson, Customer, Sale, and Automobile VO. Implemented a poller to pole automobile data from the inventory. Created React components on the frontend allowing user to add a Salesperson, list all Salespeople, add a Customer, list all Customers, add a new Sale, list all Sales, and view a salesperson's sale history.

##### Models:
* **Salesperson**: first name, last name, and employee ID
* **Customer**: first name, last name, address, and phone number
* **Sale**: price, automobile, salesperson, and customer. Created a special feature to ensure that only automobiles that have not been sold are available to sell.
* **AutomobileVO**: works with the poller to pole the VIN and sold status. This is what makes the special feature possible


#### Accessing Endpoints (using Insomnia)
#### Customers
| Action | Method | URL
| - | - | - |
| Create a customer | POST | http://localhost:8090/api/customer/
| List customers | GET | http://localhost:8090/api/customers/
| Delete a customer | DELETE | http://localhost:8090/api/customers/id/

**Creating a customer**:
To create a customer, here is an example of a JSON body to send:
```
{
    "first_name": "London",
    "last_name": "Breed",
    "address": "1 Dr Carlton B Goodlett Pl San Francisco, CA 94102",
    "phone_number": "415-554-4000"
}
```
and the response should look like this:
```
{
	"id": 1,
	"first_name": "London",
	"last_name": "Breed",
	"address": "1 Dr Carlton B Goodlett Pl San Francisco, CA 94102",
	"phone_number": "415-554-4000"
}
```

**Listing all customers**:
After sending a GET request to list all customer, the return value should look something like this:
```
{
	"customers": [
		{
			"id": 1,
			"first_name": "London",
			"last_name": "Breed",
			"address": "1 Dr Carlton B Goodlett Pl San Francisco, CA 94102",
			"phone_number": "415-554-4000"
		},
		{
			"id": 2,
			"first_name": "Sheng",
			"last_name": "Thao",
			"address": "1 Frank H. Ogawa Plaza Oakland, CA 94612",
			"phone_number": "510-238-7001"
		},
		{
			"id": 3,
			"first_name": "Matt",
			"last_name": "Mahan",
			"address": "200 E Santa Clara St San Jose, CA 95113",
			"phone_number": "408-535-3500"
		},
	]
}
```

**Deleting a customer**:
After selecting which customer to delete by putting the customer ID in the URL, the successful response should look like this:
```
{
  "deleted": true
}
```

#### Salesperson

| Action | Method | URL
| - | - | - |
| Create a salesperson | POST | http://localhost:8090/api/salesperson/
| List all salespeople | GET | http://localhost:8090/api/salespeople/
| Delete a salesperson | DELETE | http://localhost:8090/api/salesperson/id/

**Creating a salesperson**:
To create a salesperson, here is an example of a JSON body to send:
```
{
    "first_name": "Shay",
    "last_name": "Mitchell",
    "employee_id": "SMitchell"
}
```
and the response should look like this:
```
{
	"id": 1,
	"first_name": "Shay",
	"last_name": "Mitchell",
	"employee_id": "SMitchell"
}
```

**Listing all salespeople**:
After sending a GET request to list all salespeople, the return value should look something like this:
```
{
    "salespeople": [
		{
			"id": 1,
			"first_name": "Shay",
			"last_name": "Mitchell",
			"employee_id": "SMitchell"
		},
		{
			"id": 2,
			"first_name": "Chris",
			"last_name": "Evans",
			"employee_id": "CEvans"
		},
		{
			"id": 3,
			"first_name": "Ashley",
			"last_name": "Benson",
			"employee_id": "ABenson"
		}
	]
}
```

**Deleting a salesperson**:
After selecting which salesperson to delete by putting the salesperson's ID in the URL, the successful response should look like this:
```
{
    "deleted": true
}
```

#### Sales

| Action | Method | URL
| - | - | - |
| Create a sales | POST | http://localhost:8090/api/sales/
| List all sales | GET | http://localhost:8090/api/sales/
| Delete a sale | DELETE | http://localhost:8090/api/sales/id/

**Creating a sale**:
To create a sale, we use the automobile's VIN for the automobile, the employee's ID for the salesperson, and the customer's ID for customer.

After every successful sale, a PUT request is sent to the Inventory microservice to update an automobile's sold status. This integration ensures that a salesperson cannot list a car that has already been sold.

Here is an example of a JSON body to send:
```
{
    "price": "32456",
    "automobile": "1J4FF48S6YL241653",
    "salesperson": "SMitchell",
	"customer": "1"
}
```
and the response should look like this:
```
{
	"id": 1,
	"price": "32456",
	"automobile": {
		"vin": "1J4FF48S6YL241653",
		"sold": true
	},
	"salesperson": {
		"id": 1,
		"first_name": "Shay",
		"last_name": "Mitchell",
		"employee_id": "SMitchell"
	},
	"customer": {
		"id": 1,
		"first_name": "London",
		"last_name": "Breed",
		"address": "1 Dr Carlton B Goodlett Pl San Francisco, CA 94102",
		"phone_number": "415-554-4000"
	}
}
```
**Listing all sales**:
After sending a GET request to list all sales, the return value should look something like this:
```
{
	"sales": [
        {
            "id": 1,
            "price": "32456",
            "automobile": {
                "vin": "1J4FF48S6YL241653",
                "sold": true
            },
            "salesperson": {
                "id": 1,
                "first_name": "Shay",
                "last_name": "Mitchell",
                "employee_id": "SMitchell"
            },
            "customer": {
                "id": 1,
                "first_name": "London",
                "last_name": "Breed",
                "address": "1 Dr Carlton B Goodlett Pl San Francisco, CA 94102",
                "phone_number": "415-554-4000"
            }
        },
		{
			"id": 2,
			"price": 28650,
			"automobile": {
				"vin": "4T1BF1FK8CU165714",
				"sold": true
			},
			"salesperson": {
				"id": 2,
				"first_name": "Chris",
				"last_name": "Evans",
				"employee_id": "CEvans"
			},
			"customer": {
                "id": 2,
                "first_name": "Sheng",
                "last_name": "Thao",
                "address": "1 Frank H. Ogawa Plaza Oakland, CA 94612",
                "phone_number": "510-238-7001"
			}
		}
	]
}
```

**Deleting a salesperson**:
After selecting which sale to delete by putting the sale ID in the URL, the successful response should look like this:
```
{
  "deleted": true
}
```
