resource "aws_iam_role" "iam_role_cav_lambda" {
  name = "iam_role_cav_lambda"
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

resource "aws_s3_bucket" "cav_dev" {
  bucket = "caviarexpert-dev"
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

/*
data "aws_s3_bucket_object" "lambda_zip" {
  bucket = "${aws_s3_bucket.cav_dev.bucket}"
  key    = "lambda-dev-zip"
}
*/

resource "aws_lambda_function" "paypal_create" {
  #filename      = "./.tmp/lambda.zip"
  s3_bucket = "${aws_s3_bucket_object.lambda_zip.bucket}"
  s3_key = "${aws_s3_bucket_object.lambda_zip.key}"
  s3_object_version = "${aws_s3_bucket_object.lambda_zip.version_id}"
  #source_code_hash = "${data.archive_file.lambda_zip.output_base64sha256}"
  source_code_hash = "${base64sha256(file(var.lambda_zip_file))}"
  function_name = "paypal_create"
  //role          = "${var.role}"
  role = "${aws_iam_role.iam_role_cav_lambda.arn}"
  handler       = "com.itranga.cav.aws.lambda.postmen.ShipmentQuotation"
  runtime       = "java8"
  description = "Calculate shipment"
  #publish = "true"
}


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