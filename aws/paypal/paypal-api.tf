# The Paypal API "endpoint", or "resource" in AWS terminology.
# The endpoint created here is: /paypal
resource "aws_api_gateway_resource" "Paypal" {
  rest_api_id = "${var.api_id}"
  parent_id   = "${var.api_root_id}"
  path_part   = "paypal"
}

resource "aws_api_gateway_method" "PostMethod" {
  rest_api_id   = "${var.api_id}"
  resource_id   = "${aws_api_gateway_resource.Paypal.id}"
  http_method   = "POST"
  authorization = "NONE"
}

# Lambda
resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.Paypal.arn}"
  principal     = "apigateway.amazonaws.com"

  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  source_arn = "arn:aws:execute-api:${var.aws_region}:${var.aws_account_id}:${var.api_id}/*/${aws_api_gateway_method.PostMethod.http_method}/${aws_api_gateway_resource.Paypal.path_part}"
}


resource "aws_api_gateway_integration" "integration" {
  rest_api_id             = "${var.api_id}"
  resource_id             = "${aws_api_gateway_resource.Paypal.id}"
  http_method             = "${aws_api_gateway_method.PostMethod.http_method}"
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${aws_lambda_function.Paypal.arn}/invocations"
}

module "PreflightCors" {
  source = "../cors/"
  resource_name = "OptionCors"
  resource_id = "${aws_api_gateway_resource.Paypal.id}"
  rest_api_id = "${var.api_id}"
}

resource "aws_lambda_function" "Paypal" {
  #filename      = "./.tmp/lambda.zip"
  s3_bucket = "${var.s3_bucket}"
  s3_key = "${var.s3_key}"
  s3_object_version = "${var.s3_object_version}"
  #source_code_hash = "${data.archive_file.lambda_zip.output_base64sha256}"
  source_code_hash = "${var.lambda_zip_hash}"
  function_name = "paypal"
  //role          = "${var.role}"
  role = "${var.role_arn}"
  handler       = "com.itranga.cav.aws.lambda.paypal.PayFunction"
  runtime       = "java8"
  description = "Paypal payments"
  memory_size = "192"
  timeout = "40"
  #publish = "true"
  environment {
    variables = {
      POSTMEN_API_KEY = "6ace4c27-0415-46d0-ae4e-86b6f7d17aa5",
      POSTMEN_REGION = "sandbox",
      PAYPAL_CLIENT_ID = "AZ997XVWtiXBQAvpK97XJP9oSSXUoTXjIMQZD2B-qVJFoiQQ_FAF0eS_3innrhjnlDKBFNX3CGc30uU5",
      PAYPAL_CLIENT_SECRET = "EHolToL7gfptzj5i0_DyYrJzvxfRtN8G5yitFt174VxbCE0jUSw-bJ-fh_QxzTZ17bFPIXi48T9PAhH5",
      PAYPAL_MODE = "sandbox",
      PAYPAL_CANCEL_URL = "https://caviarexpert.github.io/payment/paypal/canceled",
      PAYPAL_RETURN_URL = "https://caviarexpert.github.io/payment/paypal/done"
    }
  }
}