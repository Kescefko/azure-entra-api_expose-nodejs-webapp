# Log into Azure
# az login

# Register the application
az ad app create --display-name "EmployeeAPIApp" --identifier-uris "https://employeeapiapp" --password "your-secret"

# Update the app to expose API
az ad app update --id <app-id> --set api.oauth2Permissions='[{ "adminConsentDescription": "Access employee data", "adminConsentDisplayName": "Access Employee API", "id": "unique-guid", "isEnabled": true, "type": "User", "value": "access_employee_data" }]'
