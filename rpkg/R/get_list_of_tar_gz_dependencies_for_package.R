
#' Download a package and its deps for webR
#'
#' @param pk_to_install what package do you want to install
#' @param path_to_installation Where should it be downloaded
#'
#' @export
#'
#' @examples
#' get_list_of_tar_gz_dependencies_for_package("golem")
get_list_of_tar_gz_dependencies_for_package <- function(
  pk_to_install
){
  # Build the repos url
  repos <- sprintf(
    "https://repo.r-wasm.org/bin/emscripten/contrib/%s.%s",
    # Get major R version
    R.version$major,
    substr(R.version$minor, 1, 1)
  )

  options(repos = c(webr = repos))

  deps <- unique(
    unlist(
      use.names = FALSE,
      tools::package_dependencies(
        recursive = TRUE,
        pk_to_install,
        db = utils::available.packages(
          contriburl = repos
        )
      )
    )
  )

  # Now the package list
  pkg_deps <- c(
    pk_to_install,
    deps
  )

  # Getting the list of available package
  info <- utils::available.packages(contriburl = repos)

  res <- data.frame(
    package = character(0),
    url = character(0)
  )

  # Now we can install
  for (pkg in pkg_deps) {

    # Not available: either it's not on the repo or it's included
    # in the base distribution of R
    if (!(pkg %in% info[, "Package"])) {
      message("Package {", pkg, "} not found in repo (unavailable or is base package)")
      next
    }

    # Name of the targz, should be on the form of pkg_version.this.that.tgz
    targz_file <- paste0(pkg, "_", info[info[, "Package"] == pkg, "Version"], ".tgz")

    # Location of file on the repo
    res <- rbind(
      res,
      data.frame(
        package = pkg,
        url = paste0(repos, "/", targz_file)
      )
    )
  }
  return(res)
}