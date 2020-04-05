class CreateTagsService
  def initialize(tag_names_list)
    @tag_names_list = tag_names_list
  end

  def stripped_tags
    @tag_names_list.split(', ').map{ |tag_name| tag_name.strip.gsub(' ','-') }
  end

  def create_tags!
    stripped_tags.map { |tag| Tag.find_or_create_by!(name: tag) }
  end
end
