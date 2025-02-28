# Log into Azure
# az login

# Register the app and get the appId
app_id=$(az ad app create --display-name "EmployeeAPIApp" --identifier-uris "https://employeeapiapp" --query appId -o tsv)

# Create the client secret
client_secret=$(az ad app credential reset --id $app_id --append --query password -o tsv)


# Update the app to expose API
az ad app update \
    --id $app_id \
    --set api.oauth2Permissions='[{ "adminConsentDescription": "Access employee data", "adminConsentDisplayName": "Access Employee API", "id": "unique-guid", "isEnabled": true, "type": "User", "value": "access_employee_data" }]'
