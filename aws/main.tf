/* Create and name AWS Gateway API to expose those functions publicly */
resource "aws_api_gateway_rest_api" "caviar_api" {
  name = "Cav API"
  description = "Caviarexpert shop API"
}

data "aws_region" "current" {
  current = true
}
/*
module "postmen" {
  source = "postmen/"

  aws_region = "${data.aws_region.current.name}"
  aws_account_id = "${var.aws_account_id}"

  api_id = "${aws_api_gateway_rest_api.caviar_api.id}"
  api_root_id = "${aws_api_gateway_rest_api.caviar_api.root_resource_id}"

  s3_bucket = "${aws_s3_bucket_object.lambda_zip.bucket}"
  s3_key = "${aws_s3_bucket_object.lambda_zip.key}"
  s3_object_version = "${aws_s3_bucket_object.lambda_zip.version_id}"
  role_arn = "${aws_iam_role.iam_role_cav_lambda.arn}"
  lambda_zip_hash = "${base64sha256(file(var.lambda_zip_file))}"
}

module "paypal" {
  source = "paypal/"

  aws_region = "${data.aws_region.current.name}"
  aws_account_id = "${var.aws_account_id}"

  api_id = "${aws_api_gateway_rest_api.caviar_api.id}"
  api_root_id = "${aws_api_gateway_rest_api.caviar_api.root_resource_id}"

  s3_bucket = "${aws_s3_bucket_object.lambda_zip.bucket}"
  s3_key = "${aws_s3_bucket_object.lambda_zip.key}"
  s3_object_version = "${aws_s3_bucket_object.lambda_zip.version_id}"
  role_arn = "${aws_iam_role.iam_role_cav_lambda.arn}"
  lambda_zip_hash = "${base64sha256(file(var.lambda_zip_file))}"
}
*/


module "postmen" {
  source = "lambda/"

  aws_region = "${data.aws_region.current.name}"
  aws_account_id = "${var.aws_account_id}"

  api_id = "${aws_api_gateway_rest_api.caviar_api.id}"
  api_root_id = "${aws_api_gateway_rest_api.caviar_api.root_resource_id}"

  s3_bucket = "${data.aws_s3_bucket_object.lambdas_bucket.body}"
  s3_key = "postmen"
  //s3_object_version = "${aws_s3_bucket_object.lambda_zip.version_id}"
  role_arn = "${aws_iam_role.iam_role_cav_lambda.arn}"
  //lambda_zip_hash = "${base64sha256(file(var.lambda_zip_file))}"
  lambda_function_name = "postmen"
  lambda_handler = "com.itranga.cav.aws.lambda.postmen.ShipmentQuotation"
  api_path_part = "postmen"
  lambda_environment = {
    POSTMEN_CONFIG = "${data.aws_s3_bucket_object.postmen_config.body}"
  }
}


module "invoice" {
  source = "lambda/"
  aws_region = "${data.aws_region.current.name}"
  aws_account_id = "${var.aws_account_id}"
  api_id = "${aws_api_gateway_rest_api.caviar_api.id}"
  api_root_id = "${aws_api_gateway_rest_api.caviar_api.root_resource_id}"
  s3_bucket = "${data.aws_s3_bucket_object.lambdas_bucket.body}"
  s3_key = "invoice"
  role_arn = "${aws_iam_role.iam_role_cav_lambda.arn}"
  lambda_function_name = "invoice"
  lambda_handler = "com.itranga.cav.aws.lambda.invoice.InvoiceFunction"
  api_path_part = "invoice"
  lambda_environment = {
    SIMPLE_DB = "mysimpledb-2"
    SIMPLEDB_REGION = "${data.aws_region.current.name}"
  }
}

module "paypal" {
  source = "lambda/"

  aws_region = "${data.aws_region.current.name}"
  aws_account_id = "${var.aws_account_id}"

  api_id = "${aws_api_gateway_rest_api.caviar_api.id}"
  api_root_id = "${aws_api_gateway_rest_api.caviar_api.root_resource_id}"

  s3_bucket = "${data.aws_s3_bucket_object.lambdas_bucket.body}"
  s3_key = "paypal"
  //s3_object_version = "${aws_s3_bucket_object.lambda_zip.version_id}"
  role_arn = "${aws_iam_role.iam_role_cav_lambda.arn}"
  //lambda_zip_hash = "${base64sha256(file(var.lambda_zip_file))}"
  lambda_function_name = "paypal"
  lambda_handler = "com.itranga.cav.aws.lambda.paypal.PayFunction"
  api_path_part = "paypal"
  lambda_environment = {
    PAYPAL_CONFIG = "${data.aws_s3_bucket_object.paypal_config.body}"
    PAYPAL_IPN_URL_PART = "${var.paypal_ipn_url_part}"
    SIMPLEDB_REGION = "${data.aws_region.current.name}"
  }
}

module "paypal_ipn" {
  source = "lambda/"
  aws_region = "${data.aws_region.current.name}"
  aws_account_id = "${var.aws_account_id}"
  api_id = "${aws_api_gateway_rest_api.caviar_api.id}"
  api_root_id = "${aws_api_gateway_rest_api.caviar_api.root_resource_id}"
  s3_bucket = "${data.aws_s3_bucket_object.lambdas_bucket.body}"
  s3_key = "paypal"
  //s3_object_version = "${aws_s3_bucket_object.lambda_zip.version_id}"
  role_arn = "${aws_iam_role.iam_role_cav_lambda.arn}"
  //lambda_zip_hash = "${base64sha256(file(var.lambda_zip_file))}"
  lambda_function_name = "paypal-ipn"
  lambda_handler = "com.itranga.cav.aws.lambda.paypal.IPNListener"
  api_path_part = "${var.paypal_ipn_url_part}"
  lambda_environment = {
    PAYPAL_CONFIG = "${data.aws_s3_bucket_object.paypal_config.body}"
    SIMPLEDB_REGION = "${data.aws_region.current.name}"
  }
}
/*
resource "null_resource" "api_changes" {
  triggers = {
    postmen = "${module.postmen.arn}"
    invoice = "${module.invoice.arn}"
    apihash = "${sha256("${module.postmen.arn} ${module.invoice.arn}")}"
  }
}
*/
# We can deploy the API now! (i.e. make it publicly available)
resource "aws_api_gateway_deployment" "production" {

  depends_on = ["module.postmen", "module.invoice", "module.paypal", "module.paypal_ipn"] //["module.paypal", "module.postmen"]

  rest_api_id = "${aws_api_gateway_rest_api.caviar_api.id}"
  stage_name  = "production"
  //stage_description = "${null_resource.api_changes.triggers.apihash}"
  # terraform issue-6613
  stage_description = "${sha256("${module.postmen.arn} ${module.invoice.arn} ${module.paypal.arn} ${module.paypal_ipn.arn}")}"
  #description = "Deploy methods: ${module.hello_get.http_method} ${module.hello_post.http_method}"
  description = "Production API"
}

output "api_url" {
  value = "${aws_api_gateway_deployment.production.invoke_url}"
}
