/*
 * The API requires at least one "endpoint", or "resource" in AWS terminology.
 * The endpoint created here is: /postmen
*/
resource "aws_api_gateway_resource" "Endpoint" {
  rest_api_id = "${var.api_id}"
  parent_id   = "${var.api_root_id}"
  path_part   = "${var.api_path_part}"
}

resource "aws_api_gateway_method" "PostMethod" {
  rest_api_id   = "${var.api_id}"
  resource_id   = "${aws_api_gateway_resource.Endpoint.id}"
  http_method   = "POST"
  authorization = "NONE"
}

# Lambda
resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.JavaFunction.arn}"
  principal     = "apigateway.amazonaws.com"

  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  source_arn = "arn:aws:execute-api:${var.aws_region}:${var.aws_account_id}:${var.api_id}/*/${aws_api_gateway_method.PostMethod.http_method}/${aws_api_gateway_resource.Endpoint.path_part}"
}


resource "aws_api_gateway_integration" "integration" {
  rest_api_id             = "${var.api_id}"
  resource_id             = "${aws_api_gateway_resource.Endpoint.id}"
  http_method             = "${aws_api_gateway_method.PostMethod.http_method}"
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${aws_lambda_function.JavaFunction.arn}/invocations"
}

data "aws_s3_bucket_object" "lambdas_jar" {
  bucket = "${var.s3_bucket}"
  key    = "${var.s3_key}"
}

resource "aws_lambda_function" "JavaFunction" {
  #filename      = "./.tmp/lambda.zip"

  s3_bucket = "${data.aws_s3_bucket_object.lambdas_jar.bucket}"
  s3_key = "${data.aws_s3_bucket_object.lambdas_jar.key}"
//  s3_object_version = "${data.aws_s3_bucket_object.lambdas_jar.version_id}"
//  s3_bucket = "${var.s3_bucket}"
//  s3_key = "${var.s3_key}"
  #source_code_hash = "${data.archive_file.lambda_zip.output_base64sha256}"
  //source_code_hash = "${var.lambda_zip_hash}"
  source_code_hash = "${lookup(data.aws_s3_bucket_object.lambdas_jar.metadata, "Base64sha256", "haha")}"
  //source_code_hash = "${join(",", keys(data.aws_s3_bucket_object.lambdas_jar.metadata))}"
  function_name = "${var.lambda_function_name}"
  //role          = "${var.role}"
  role = "${var.role_arn}"
  handler       = "${var.lambda_handler}"
  runtime       = "java8"
  description = "${var.lambda_description}"
  memory_size = "${var.lambda_memory_size}"
  timeout = "${var.lambda_timeout}"
  #publish = "true"
  environment {
    variables = "${var.lambda_environment}"
  }
}


/*
  Preflight CORS configuration.
  See https://github.com/carrot/terraform-api-gateway-cors-module
*/
resource "aws_api_gateway_method" "Options" {
  rest_api_id = "${var.api_id}"
  resource_id = "${aws_api_gateway_resource.Endpoint.id}"
  http_method = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "OptionsIntegration" {
  rest_api_id = "${var.api_id}"
  resource_id = "${aws_api_gateway_resource.Endpoint.id}"
  http_method = "${aws_api_gateway_method.Options.http_method}"
  type = "MOCK"
  request_templates = { 
    "application/json" = <<PARAMS
{ "statusCode": 200 }
PARAMS
  }
}

resource "aws_api_gateway_method_response" "Options_200" {
  rest_api_id = "${var.api_id}"
  resource_id = "${aws_api_gateway_resource.Endpoint.id}"
  http_method = "${aws_api_gateway_method.Options.http_method}"
  status_code = "200"
  response_models = { "application/json" = "Empty" }
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_integration_response" "OptionsIntegration" {
  rest_api_id = "${var.api_id}"
  resource_id = "${aws_api_gateway_resource.Endpoint.id}"
  http_method = "${aws_api_gateway_method.Options.http_method}"
  status_code = "${aws_api_gateway_method_response.Options_200.status_code}"
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'POST,OPTIONS,GET,PUT,PATCH,DELETE'",
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }
}

output "arn" {
  value = "${aws_lambda_function.JavaFunction.arn}"
}

