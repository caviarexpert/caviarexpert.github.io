//First, we need a role to play with Lambda
resource "aws_iam_role" "iam_role_for_lambda" {
  name = "iam_role_for_lambda"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

/* Now, we need an API to expose those functions publicly */
resource "aws_api_gateway_rest_api" "postmen_api" {
  name = "Postment API"
}

/*
 * The API requires at least one "endpoint", or "resource" in AWS terminology.
 * The endpoint created here is: /hello
*/
resource "aws_api_gateway_resource" "postment_hello" {
  rest_api_id = "${aws_api_gateway_rest_api.postment_api.id}"
  parent_id   = "${aws_api_gateway_rest_api.postmen_api.root_resource_id}"
  path_part   = "postmen"
}


// We can deploy the API now! (i.e. make it publicly available)
resource "aws_api_gateway_deployment" "postmen_api_deployment" {
  rest_api_id = "${aws_api_gateway_rest_api.postmen_api.id}"
  stage_name  = "production"
  description = "Deploy methods: ${module.hello_get.http_method} ${module.hello_post.http_method}"
}

output "api_url" {
  value = "${aws_api_gateway_deployment.postmen_api_deployment.invoke_url}"
}