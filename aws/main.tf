/* Create and name AWS Gateway API to expose those functions publicly */
resource "aws_api_gateway_rest_api" "caviar_api" {
  name = "Cav API"
}

# We can deploy the API now! (i.e. make it publicly available)
resource "aws_api_gateway_deployment" "production" {
  rest_api_id = "${aws_api_gateway_rest_api.caviar_api.id}"
  stage_name  = "production"
  #description = "Deploy methods: ${module.hello_get.http_method} ${module.hello_post.http_method}"
  description = "Production API"
}


module "paypal" {
  source = "paypal/"
  rest_api_id = "${aws_api_gateway_rest_api.caviar_api.id}"
  root_resource_id = "${aws_api_gateway_rest_api.caviar_api.root_resource_id}"
}


output "api_url" {
  value = "${aws_api_gateway_deployment.production.invoke_url}"
}
