variable "rest_api_id" {
    description = "Gateway API id"
}
variable "root_resource_id" {
  description = "The API resource ID"
}

# The Paypal API "endpoint", or "resource" in AWS terminology.
# The endpoint created here is: /paypal
resource "aws_api_gateway_resource" "Paypal" {
  rest_api_id = "${var.rest_api_id}"
  parent_id   = "${var.root_resource_id}"
  path_part   = "paypal"
}

module "PreflightCors" {
  source = "github.com/carrot/terraform-api-gateway-cors-module"
  resource_name = "OptionCors"
  resource_id = "${aws_api_gateway_resource.Paypal.id}"
  rest_api_id = "${var.rest_api_id}"
}