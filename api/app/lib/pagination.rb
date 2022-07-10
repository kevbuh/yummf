class Pagination
  def self.build_json object, nested_page = 1, nested_per = 10
    ob_name = object.name.downcase.pluralize
    json = Hash.new
    json[ob_name] = ActiveModelSerializers::SerializableResource.new(object.to_a, nested_page: nested_page, nested_per: nested_per)
    json[:pagination] = {
        current_page: object.current_page,
        next_page: object.next_page,
        prev_page: object.prev_page,
        total_pages: object.total_pages,
        total_count: object.total_count
    }
    return json
  end
end

# module Pagination
#   DEFAULT_PAGE_LIMIT = 10

#   def pages(records:, url:)
#     paginate = Paginate.new(records: records,
#                             url: url,
#                             limit: limit,
#                             params: pagination_params)
#     paginate.pages
#   end

#   def limit
#     return self.class::PAGE_LIMIT if defined? self.class::PAGE_LIMIT

#     DEFAULT_PAGE_LIMIT
#   end

#   def pagination_params
#     params.permit(:cursor_created_at, :direction)
#   end


#   class Paginate
#     def initialize(records:, url:, limit:, params:)
#       @records = records
#       @url = url
#       @limit = limit
#       @params = params
#     end

#     def pages
#       {
#         records: paginated_records,
#         next_url: pagination_url(direction: "next"),
#         prev_url: pagination_url(direction: "prev"),
#       }
#     end

#     private
#       def pagination_window
#         return if @params[:cursor_created_at].blank?

#         if @params[:direction] == "prev"
#           @records.arel_table[:created_at].gt(@params[:cursor_created_at])
#         else
#           @records.arel_table[:created_at].lt(@params[:cursor_created_at])
#         end
#       end

#       def pagination_url(direction:)
#         return "" if @seek == false && direction == @params[:direction]
#         return "" if @params[:cursor_created_at].blank? && direction == "prev" # first page

#         cursor = direction == "prev" ?  paginated_records.first : paginated_records.last

#         uri = URI(@url)
#         params = Hash[URI.decode_www_form(uri.query || "")]
#                    .merge("cursor_created_at" => cursor.created_at.iso8601(6), # PG default is 6
#                           "direction" => direction)
#         uri.query = URI.encode_www_form(params)
#         uri
#       end


#       def paginated_records
#         return @paginated_records if defined? @paginated_records

#         @paginated_records = @records
#                                .unscope(:order)
#                                .where(pagination_window)
#                                .order(created_at: order_direction)
#                                .limit(@limit + 1)
#                                .to_a

#         @seek = (@paginated_records.size > @limit)
#         @paginated_records.pop if @seek == true
#         @paginated_records.reverse! if @params[:direction] == "prev"
#         @paginated_records
#       end

#       def order_direction
#         return :asc if @params[:direction] == "prev"

#         :desc
#       end
#   end
# end