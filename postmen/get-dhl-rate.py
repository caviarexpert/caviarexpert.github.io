	# Make sure to install requests: pip install requests

import requests
import json
from collections import namedtuple
	
url = 'https://sandbox-api.postmen.com/v3/rates'
	
payload = '''
{
  "async": false,
  "shipper_accounts": [
    {
      "id": "0fe56e4f-2c61-4088-8fbf-e9614e4f6d0e"
    }
  ],
  "is_document": false,
  "shipment": {
    "ship_from": {
      "contact_name": "[DHL] Contact name",
      "company_name": "[DHL] Testing Company",
      "street1": "Testing Street",
      "country": "HKG",
      "type": "business",
      "postal_code": null,
      "city": "Tsuen Wan",
      "phone": "+85212345678",
      "street2": null,
      "tax_id": null,
      "street3": null,
      "state": null,
      "email": "dhl@test.com",
      "fax": null
    },
    "ship_to": {
      "contact_name": "Dr. Moises Corwin",
      "phone": "1-140-225-6410",
      "email": "Giovanna42@yahoo.com",
      "street1": "28292 Daugherty Orchard",
      "city": "Beverly Hills",
      "postal_code": "90209",
      "state": "CA",
      "country": "USA",
      "type": "residential"
    },
    "parcels": [
      {
        "description": "Food XS",
        "box_type": "custom",
        "weight": {
          "value": 2,
          "unit": "kg"
        },
        "dimension": {
          "width": 20,
          "height": 40,
          "depth": 40,
          "unit": "cm"
        },
        "items": [
          {
            "description": "Food Bar",
            "origin_country": "USA",
            "quantity": 2,
            "price": {
              "amount": 3,
              "currency": "USD"
            },
            "weight": {
              "value": 0.6,
              "unit": "kg"
            },
            "sku": "imac2014"
          }
        ]
      }
    ]
  }
}
'''
headers = {
	    'postmen-api-key': '6ace4c27-0415-46d0-ae4e-86b6f7d17aa5',
	    'content-type': 'application/json'
}
	
#response = requests.request('POST', url, data=payload, headers=headers)
	
#print(response.text)
#rsp = requests.post(url, json=payload, headers=headers)
rsp = requests.post(url, payload, headers=headers)
print rsp.text
# Parse JSON into an object with attributes corresponding to dict keys.
x = json.loads(rsp.text, object_hook=lambda d: namedtuple('X', d.keys())(*d.values()))
#print x.name, x.hometown.name, x.hometown.id
print x.meta