resource "aws_iam_role" "iam_role_cav_lambda" {
  name = "iam_role_cav_lambda"
  description = "Role for lambdas"
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
data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "policy" {
  statement {
    sid = ""
    effect = "Allow"
    actions = [
      "sdb:*",
      "logs:*"
    ]
    resources = [
      "arn:aws:sdb:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:*",
      "arn:aws:logs:*:*:*"
    ]
  }
}

resource "aws_iam_policy" "policy" {
    name        = "test-policy"
    description = "ALL SimpleDB in eu-west-1 (for test)"
    policy = "${data.aws_iam_policy_document.policy.json}"
}

resource "aws_iam_role_policy_attachment" "test-attach" {
    role       = "${aws_iam_role.iam_role_cav_lambda.name}"
    policy_arn = "${aws_iam_policy.policy.arn}"
}
/*
resource "aws_s3_bucket" "cav_dev" {
  bucket = "${var.lambda_s3_bucket}"
  acl    = "private"
  tags {
    Name        = "Cav DEV backet"
    Environment = "Dev"
  }
}

resource "aws_s3_bucket_object" "lambda_zip" {
  bucket = "${aws_s3_bucket.cav_dev.bucket}"
  key    = "lambda-dev-zip"
  source = "${var.lambda_zip_file}"
  etag   = "${md5(file(var.lambda_zip_file))}"
}
*/
/*
data "aws_s3_bucket_object" "lambda_zip" {
  bucket = "${aws_s3_bucket.cav_dev.bucket}"
  key    = "lambda-dev-zip"
}
*/
/*
resource "aws_lambda_function" "shipment-quotation" {
  #filename      = "./.tmp/lambda.zip"
  s3_bucket = "${aws_s3_bucket_object.lambda_zip.bucket}"
  s3_key = "${aws_s3_bucket_object.lambda_zip.key}"
  s3_object_version = "${aws_s3_bucket_object.lambda_zip.version_id}"
  #source_code_hash = "${data.archive_file.lambda_zip.output_base64sha256}"
  source_code_hash = "${base64sha256(file(var.lambda_zip_file))}"
  function_name = "shipment-quotation"
  //role          = "${var.role}"
  role = "${aws_iam_role.iam_role_cav_lambda.arn}"
  handler       = "com.itranga.cav.aws.lambda.postmen.ShipmentQuotation"
  runtime       = "java8"
  description = "Calculate shipment"
  #publish = "true"
}
*/

/*
resource "aws_lambda_function" "cav_lambda" {
  #filename      = "./.tmp/lambda.zip"
  s3_bucket = "${aws_s3_bucket_object.lambda_zip.bucket}"
  s3_key = "${aws_s3_bucket_object.lambda_zip.key}"
  s3_object_version = "${aws_s3_bucket_object.lambda_zip.version_id}"
  #source_code_hash = "${data.archive_file.lambda_zip.output_base64sha256}"
  source_code_hash = "${base64sha256(file(var.lambda_zip_file))}"
  function_name = "${var.name}_${var.handler}"
  role          = "${var.role}"
  handler       = "${var.name}.${var.handler}"
  runtime       = "java8"
  #publish = "true"
}
*/